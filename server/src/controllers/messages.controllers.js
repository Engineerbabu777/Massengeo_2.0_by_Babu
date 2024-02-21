import { findImageMessage } from '../helper/utils.js'
import { onlineUsers } from '../index.js'
import { Conversation } from '../models/conversation.model.js'
import { Message } from '../models/message.model.js'
import { UnreadCount } from '../models/unreadCount.model.js'

// SEND MESSAGES ROUTES!
export const sendMessage = async (req, res) => {
  try {
    // EXTRACT USER, MESSAGE, CONVERSATION_ID, AND MESSAGE_TYPE FROM THE REQUEST BODY
    const user = req.user
    const { message, conversationId, messageType, receiverId } = req.body

    // Checks if user is online then marked delivered as true else false
    const isDelivered = Object.values(onlineUsers).includes(receiverId[0])
      ? true
      : false

    console.log(messageType)

    

    // CREATE A NEW MESSAGE DOCUMENT IN THE MESSAGE COLLECTION
    const newMessage = await Message.create({
      message: message.text || "default",
      senderId: user._id,
      conversationId,
      messageType,
      image: findImageMessage(messageType, message), // RETURNS ITS VALUE!
      seenBy: [req.user._id], // MEANS THE SENDER HAS SEEN THE MESSAGE(BUT OTHERS NOT!)!
      delivered: isDelivered,
      receiverId: receiverId, // ARRAY OF RECEIVER IDS!
      isGroupMessage: receiverId.length > 1 ? true : false
    })

    const conversation = await Conversation.findById(conversationId).populate(
      'unreadCount'
    )

    // FINDING THE UNREAD COUNTS FOR THIS CONVERSATION (TO INCREASE RECEIVER COUNTS)!
    if (receiverId.length === 1) {
      const unreadCountForThisConversation = await UnreadCount.findOneAndUpdate(
        {
          userId: receiverId[0],
          conversationId: conversationId
        },
        {
          count: conversation?.unreadCount?.count
            ? conversation.unreadCount.count + 1
            : 1
        },
        {
          upsert: true,
          new: true
        }
      )

      // UPDATE THE LAST_MESSAGE FIELD IN THE CORRESPONDING CONVERSATION DOCUMENT
      await Conversation.findByIdAndUpdate(
        conversationId,
        {
          lastMessage: newMessage,
          unreadCount: unreadCountForThisConversation._id
        },
        {
          new: true // RETURNS NEW DOC!
        }
      )
        .populate('users lastMessage unreadCount')
        .exec()
    }

    // IF THE RECEIVER ID IS MORE THAN ONE THEN THIS MEANS THATS RHE MESSAGE FROM THE GROUP CONVERSATION!
    if (receiverId.length > 1) {
      // AS RECEIVER IDS ARE OF MORE THAN ONE LENGTH SO WE HAVE TO LOOP THROUGH IT!
      let allPromises = []
      for (let i = 0; i < receiverId.length; i++) {
        const unreadCountForThisConversation =
          await UnreadCount.findOneAndUpdate(
            {
              userId: receiverId[i],
              conversationId: conversationId
            },
            {
              count: conversation?.unreadCount?.count
                ? conversation.unreadCount.count + 1
                : 1
            },
            {
              upsert: true,
              new: true
            }
          )
        allPromises.push(unreadCountForThisConversation)
      }

      const allUnReads = await Promise.all(allPromises)

      console.log(allUnReads)

      let allConversationPromises = []
      for (let i = 0; i < receiverId.length; i++) {
        // UPDATE THE LAST_MESSAGE FIELD IN THE CORRESPONDING CONVERSATION DOCUMENT
        const conversation = await Conversation.findByIdAndUpdate(
          conversationId,
          {
            lastMessage: newMessage,
            unreadCount: allUnReads[i]._id
          },
          {
            new: true // RETURNS NEW DOC!
          }
        )
          .populate('users lastMessage unreadCount')
          .exec()

        allConversationPromises.push(conversation)
      }

      await Promise.all(allConversationPromises)
    }

    // SEND A SUCCESS RESPONSE
    res.status(201).json({
      success: true,
      message: 'MESSAGE SENT SUCCESSFULLY!',
      updatedConversation: await Conversation.findById(conversationId)
        .populate('users unreadCount')
        .populate({
          path: 'lastMessage',
          populate: 'senderId'
        }),
      newMessage: await Message.findById(newMessage._id)
        .populate('senderId')
        .exec()
    })
    // SEND RESPONSE BACK!
  } catch (error) {
    // LOG AND SEND AN ERROR RESPONSE WITH A MORE DETAILED MESSAGE
    console.log('API SEND MESSAGE ERROR: ', error?.message)
    res.status(500).json({ error: true, message: 'INTERNAL SERVER ERROR' })
  }
}

// FETCH ALL MESSAGES ROUTE!
export const fetchAllMessages = async (req, res) => {
  try {
    // EXTRACT USER AND CONVERSATION_ID FROM REQUEST PARAMETERS
    const user = req.user
    const { conversationId } = req.params

    // WHEN USER FETCH FOR MESSAGES THAT MEANS HAS SEEN ALL OF THE MESSAGE THAT ARE UNSEEN!
    // FIND ALL MESSAGE AND MARKED THEM AS SEEN BY THE CURRENT USER!
    await Message.updateMany(
      {
        conversationId,
        seenBy: { $nin: [user?._id] }
      },
      {
        $push: { seenBy: req.user?._id }
      }
    )

    // FETCH ALL MESSAGES ASSOCIATED WITH THE SPECIFIED CONVERSATION_ID
    const messages = await Message.find({ conversationId }).populate('senderId')

    // SEND A SUCCESS RESPONSE WITH THE FETCHED MESSAGES
    res.status(200).json({ success: true, messages: messages })
  } catch (error) {
    // LOG AND SEND AN ERROR RESPONSE WITH A MORE DETAILED MESSAGE
    console.log('API FETCH ALL MESSAGES ERROR: ', error?.message)
    res.status(500).json({ error: true, message: 'INTERNAL SERVER ERROR' })
  }
}

// MARK MESSAGE AS READ!
export const readTheMessageThatWasSent = async (req, res) => {
  try {
    // EXTRACT USER AND CONVERSATION_ID FROM REQUEST PARAMETERS
    const user = req.user
    const { conversationId, messageId } = req.params

    // WHEN USER FETCH FOR MESSAGES THAT MEANS HAS SEEN ALL OF THE MESSAGE THAT ARE UNSEEN!
    // FIND ALL MESSAGE AND MARKED THEM AS SEEN BY THE CURRENT USER!
    await Message.findByIdAndUpdate(messageId, {
      $push: { seenBy: user?._id }
    })

    // SEND A SUCCESS RESPONSE WITH THE FETCHED MESSAGES
    res.status(200).json({ success: true, message: 'Message Marked as Read!' })
  } catch (error) {
    // LOG AND SEND AN ERROR RESPONSE WITH A MORE DETAILED MESSAGE
    console.log('UPDATING MESSAGE READ ERROR: ', error?.message)
    res.status(500).json({ error: true, message: 'INTERNAL SERVER ERROR' })
  }
}

// SEND MESSAGES ROUTES!
export const updateMessage = async (req, res) => {
  try {
    // EXTRACT USER, MESSAGE, CONVERSATION_ID, AND MESSAGE_TYPE , MESSAGE_ID FROM THE REQUEST BODY
    const user = req.user
    const { message, conversationId, messageType, receiverId, messageId } =
      req.body

    // UPDATE THE MESSAGE WITH NEW MESSAGE!
    const editedMessage = await Message.findByIdAndUpdate(messageId, {
      message,
      messageType,
      isEdited: true
    })

    // SEND A SUCCESS RESPONSE
    res.status(201).json({
      success: true,
      message: 'MESSAGE SENT SUCCESSFULLY!',
      updatedConversation: await Conversation.findById(conversationId).populate(
        'users lastMessage unreadCount'
      ),
      editedMessage: await Message.findById(editedMessage?._id)
        .populate('senderId')
        .exec()
    })

    // SEND RESPONSE BACK!
  } catch (error) {
    // LOG AND SEND AN ERROR RESPONSE WITH A MORE DETAILED MESSAGE
    console.log('API SEND MESSAGE ERROR: ', error?.message)
    res.status(500).json({ error: true, message: 'INTERNAL SERVER ERROR' })
  }
}

// DELETE MESSAGE ROUTE HANDLER!
export const deleteMessage = async (req, res) => {
  try {
    // EXTRACT USER AND MESSAGE,TYPE FROM REQUEST PARAMETERS
    const user = req.user
    const { type, messageId } = req.body

    // UPDATE MESSAGE DELETION TYPE!
    await Message.findByIdAndUpdate(messageId, {
      deleteForMe: type === 'delete_me' ? true : false,
      deleteForEveryOne: type === 'delete_everyone' ? true : false
    })

    // SEND A SUCCESS RESPONSE WITH THE FETCHED MESSAGES
    res.status(200).json({
      success: true,
      message: 'Message Marked as Read!',
      deletedMessage: await Message.findById(messageId)
        .populate('senderId')
        .exec(),
      updatedConversation: await Conversation.findById(
        (
          await Message.findById(messageId)
        ).conversationId
      )
        .populate('users lastMessage unreadCount')
        .exec()
    })
  } catch (error) {
    // LOG AND SEND AN ERROR RESPONSE WITH A MORE DETAILED MESSAGE
    console.log('DELETING MESSAGE READ ERROR: ', error?.message)
    res.status(500).json({ error: true, message: 'INTERNAL SERVER ERROR' })
  }
}

// CLEAR MESSAGES FOR ON END!!
// to be include
