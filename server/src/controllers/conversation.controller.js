import { Conversation } from '../models/conversation.model.js'
import { Message } from '../models/message.model.js'

// CREATE CONVERSATION CONTROLLER
export const createConversation = async (req, res) => {
  try {
    // EXTRACT USER IDS FROM REQUEST BODY (FOR NOW, SUPPORTING ONLY SINGLE CONVERSATION!)
    const { userId } = req.body

    // USER ID OF THE REQUESTING USER WHO IS CREATING THE CONVERSATION
    const requestedUserID = req.user._id

    // CREATE A NEW CONVERSATION IN THE DATABASE
    await Conversation.create({
      users: [requestedUserID, userId]
    })

    // RETURN A SUCCESSFUL RESPONSE WITH A STATUS OF 201 CREATED
    res
      .status(201)
      .json({ success: true, message: 'Conversation created successfully' })
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
    const data = await Message.updateMany(
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
      users: { $in: [req.user._id] }
    })
      .populate('users lastMessage')
      .sort({ updatedAt: -1 })

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
