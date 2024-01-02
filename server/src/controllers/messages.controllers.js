import { Conversation } from '../models/conversation.model.js'
import { Message } from '../models/message.model.js'

// SEND MESSAGES ROUTES!
export const sendMessage = async (req, res) => {
  try {
    // EXTRACT USER, MESSAGE, CONVERSATION_ID, AND MESSAGE_TYPE FROM THE REQUEST BODY
    const user = req.user
    const { message, conversationId, messageType } = req.body

    // CREATE A NEW MESSAGE DOCUMENT IN THE MESSAGE COLLECTION
    const newMessage = await Message.create({
      message,
      senderId: user._id,
      conversationId,
      messageType,
      seenBy: [req.user._id] // MEANS THE SENDER HAS SEEN THE MESSAGE(BUT OTHERS NOT!)!
    })

    // UPDATE THE LAST_MESSAGE FIELD IN THE CORRESPONDING CONVERSATION DOCUMENT
    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: newMessage
      },
      {
        new: true // RETURNS NEW DOC!
      }
    )
      .populate('users lastMessage')
      .exec()
    // SEND A SUCCESS RESPONSE
    res.status(201).json({
      success: true,
      message: 'MESSAGE SENT SUCCESSFULLY!',
      updatedConversation,
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
