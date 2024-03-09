import { Conversation } from '../models/conversation.model.js'
import { Message } from '../models/message.model.js'

// CREATE CONVERSATION CONTROLLER
export const createConversation = async (req, res) => {
  try {
    // EXTRACT USER IDS FROM REQUEST BODY (FOR NOW, SUPPORTING ONLY SINGLE CONVERSATION!)
    const { userIds, group } = req.body

    // USER ID OF THE REQUESTING USER WHO IS CREATING THE CONVERSATION
    const requestedUserID = req.user._id

    // CHECK IF THERE IS EXISTING CONVERSATION WITH THESE ONE!
    const existingConversation = await Conversation.findOne({
      users: {
        $all: !group
          ? [userIds, requestedUserID]
          : [...userIds, requestedUserID]
      }, // IF USERS CONTAINS ALL OF THESE IDS THEN CONVERSATION EXISTS!
      group: group
    })

    // RETURN RESPONSE THAT CONVERSATION IS ALREADY EXISTS!
    if (existingConversation) {
      return res.status(200).json({
        message: 'Conversation already exists!',
        conversation: existingConversation
      })
    }

    // CREATE A NEW CONVERSATIONS IN THE DATABASE

    if (group) {
      // GROUP CONVERSATION!!
      await Conversation.create({
        users: [...userIds, requestedUserID],
        group: true,
        groupAdmins: [requestedUserID]
      })
    } else {
      // SINGLE CONVERSATION!!
      const newConversation = await Conversation.create({
        users: [requestedUserID, userIds]
      })

      // RETURN A SUCCESSFUL RESPONSE WITH A STATUS OF 201 CREATED
      return res.status(201).json({
        success: true,
        message: 'Conversation created successfully',
        newConversation: await Conversation.findById(newConversation._id)
          .populate('lastMessage unreadCount groupAdmins')
          .populate({
            path: 'users',
            select: 'email avatar username about blockedList'
          })
      })
    }
  } catch (error) {
    // LOG AND HANDLE ERROR IF CREATION FAILS
    console.log('Creating Conversation Error: ', error.message)

    // RETURN AN ERROR RESPONSE WITH A STATUS OF 504 GATEWAY TIMEOUT
    res
      .status(504)
      .json({ error: true, message: 'Conversation creation failed' })
  }
}

// FETCH ALL CONVERSATIONS CONTROLLER
export const fetchAllConversations = async (req, res) => {
  try {
    // MARKED ALL UN_DELIVERED MESSAGES OF THIS USER TO BE DELIVERED!
    await Message.updateMany(
      {
        receiverId: req.user._id, // MEANS THOSE MESSAGE THAT WHERE SEND TO THIS USER WILL BE DELIVERED FOR OTHERS!
        delivered: false // FINDING BOTH CONDITIONS TO BE TRUE!
      },
      {
        delivered: true // LATE WE WILL UPDATE IT TO ARRAY LIKE SEEN BY HAVING!
      },
      {
        new: true
      }
    )

    // RETRIEVE ALL CONVERSATIONS FROM THE DATABASE WHERE THE REQUESTING USER ID IS INCLUDED!!
    const conversations = await Conversation.find({
      $or: [
        { users: { $in: [req.user._id] } },
        // OR!
        { leavedUsers: { $in: [req.user._id] } }
      ]
    })
      .populate('users unreadCount groupAdmins leavedUsers')
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'leaveOrRemovalData.userId senderId',
          model: 'user',
          select: 'avatar username email'
        }
      })
      .sort({ updatedAt: -1 })

      // const newData = conversations.map(c => c.unreadCount.filter((u) => u._id.toString() === req.user._id.toString()));

    // RETURN A SUCCESSFUL RESPONSE WITH A STATUS OF 200 OK AND THE FETCHED CONVERSATIONS!!
    res.status(200).json({
      success: true,
      message: 'Conversations fetched successfully',
      conversations
    })
  } catch (error) {
    // LOG AND HANDLE ERROR IF FETCHING FAILS!!
    console.log('Fetching Conversations Error: ', error.message)

    // RETURN AN ERROR RESPONSE WITH A STATUS OF 504 GATEWAY TIMEOUT!!
    res
      .status(504)
      .json({ error: true, message: 'Conversations fetching failed' })
  }
}

// FETCH USERS INVOLVED IN SINGLE CHAT WITH REQUESTED USERS
export const fetchAllUserConversationsFriends = async (req, res) => {
  try {
    // FIND ALL CONVERSATIONS WHERE THE REQUESTING USER ID IS INCLUDED!!
    const conversations = await Conversation.find({
      users: { $in: [req.user._id] },
      group: false
    })
      .select('users')
      .populate({
        path: 'users',
        select: 'username avatar stories blockedList',
        populate:[
          {path:"stories"},
          {path:"blockedList"}
        ]
      })

    // FROM ALL CONVERSATION GET OTHER USERS IN AN ARRAY CONTAINING USERS OBJECT!
    const friends = conversations.map(conversation => {
      return conversation.users.filter(
        user => user._id.toString() !== req.user._id.toString()
      )
    })

    // RETURN A SUCCESSFUL RESPONSE WITH A STATUS OF 200 OK AND THE FETCHED FRIENDS!!
    res.status(200).json({
      success: true,
      message: 'Friends fetched successfully',
      friends: friends.flat()
    })
  } catch (error) {
    // LOG AND HANDLE ERROR IF FETCHING FAILS!!
    console.log('Fetching Friends Error: ', error.message)

    // RETURN AN ERROR RESPONSE WITH A STATUS OF 504 GATEWAY TIMEOUT!!
    res.status(504).json({ error: true, message: 'Friends fetching failed' })
  }
}

// UPDATE GROUP CONVERSATION!
export const groupConversationUpdate = async (req, res) => {
  try {
    // GET THE ID OF USER!
    const user = req.user
    const userId = user._id

    // REQUEST BODY!
    const data = req.body

    console.log({ data, userId })

    // CHECK IF THE USER IS THE ADMIN OF THE GROUP!
    const conversation = await Conversation.findById(data.groupId)

    // IF THE REQUESTED USER IS NOT ADMIN!
    if (!conversation?.groupAdmins?.includes(userId)) {
      return res.status(401).json({
        error: true,
        message: 'You are not the admin of this group!'
      })
    }

    // ELSE IT MEANS HE IS THE ADMIN OF THE GROUP!
    // LETS CHANGE THE GROUP DETAILS!
    const group = await Conversation.findByIdAndUpdate(
      data.groupId,
      {
        [data.updateType]: data.updateValue
      },
      {
        new: true
      }
    )
      .populate('groupAdmins leavedUsers')
      .populate({
        path: 'users',
        select: 'username avatar'
      })

    // RETURN SUCCESS RESPONSE!
    res.status(200).json({
      message: 'Updated Success',
      success: true,
      data: group
    })
  } catch (error) {
    console.log('Group Update Error:', error.message)
    res.status(200).json({
      message: 'Group update failed!',
      error: true
    })
  }
}

// REMOVE USERS FROM THE CONVERSATIONS!
export const memberRemovalOrLeave = async (req, res) => {
  try {
    const user = req.user
    const { userId, groupId: conversationId, removeType } = req.body

    const conversation = await Conversation.findById(conversationId)

    // TODO: CHECK IF THE USER IS THE MEMBER OF THE GROUP && USER IS NOT ALREADY PRESENT IN THESE FIELDS WHERE WE ARE ADDING HIM!

     // CREATE NEW MESSAGE!
     const message = await Message.create({
      conversationId: conversationId,
      isLeaveOrRemoval: true,
      leaveOrRemovalData: {
        userId: userId,
        removalType: removeType
      },
      receiverId:[...conversation.users],
      seenBy:[req.user.id],
      message_accessed_by:[...conversation.users],
      message: `${
        removeType === 'remove-by-admin'
          ? 'removed by admin(🔐)'
          : 'leave the group'
      }`
    })

    // UPDATE THE LAST MESSAGE THAT SOME USER IS LEAVED!
    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: message._id
      },
      { new: true }
    )
    
    await Conversation.findByIdAndUpdate(conversationId, {
      // THIS WILL REMOVE THIS USER FROM THE USERS ARRAY!
      $pull: {
        users: userId
      }
    })

    await Conversation.findByIdAndUpdate(conversationId, {
      // THIS WILL UPDATE CHAT STATUS FOR THAT USER!
      $push: {
        ChatStatusForPreviousMembers: {
          userId: userId,
          groupName: conversation.groupName,
          avatar: conversation.avatar,
          status: conversation.avatar,
          groupMembers: conversation.users
        }
      }
    })

    await Conversation.findByIdAndUpdate(
      conversationId,
      {
        // ADD REMOVED USER TO LEAVED USERS!
        $push: {
          leavedUsers: userId
        }
      },
      { new: true }
    )

   

    // GET FRESH DATA!
    const conversationData = await Conversation.findById(conversationId)
      .populate('groupAdmins leavedUsers unreadCount')
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'leaveOrRemovalData.userId',
          model: 'user',
          select: 'avatar username email'
        }
      })
      .populate({
        path: 'users',
        select: 'username avatar'
      })

      // FETCHING BACK THE LAST MESSAGE()!
      const lastMessage = await Message.findById(message._id).populate('senderId').populate({path:'leaveOrRemovalData.userId',model:'user',select:'username avatar email'})

    res.status(200).json({
      success: true,
      data: conversationData,
      lastMessage

    })
  } catch (error) {
    console.log('Member deletion Error: ', error)
    res.status(200).json({
      error: true,
      message: error.message
    })
  }
}
