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
      messageType
    })

    // UPDATE THE LAST_MESSAGE FIELD IN THE CORRESPONDING CONVERSATION DOCUMENT
    const updatedConversation = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        lastMessage: newMessage
      }
    )
    // SEND A SUCCESS RESPONSE
    res
      .status(201)
      .json({ SUCCESS: true, MESSAGE: 'MESSAGE SENT SUCCESSFULLY!' })
    // SEND RESPONSE BACK!
  } catch (error) {
    // LOG AND SEND AN ERROR RESPONSE WITH A MORE DETAILED MESSAGE
    console.log('API SEND MESSAGE ERROR: ', error?.message)
    res.status(500).json({ SUCCESS: false, MESSAGE: 'INTERNAL SERVER ERROR' })
  }
}

// FETCH ALL MESSAGES ROUTE!
export const fetchAllMessages = async (req, res) => {
  try {
    // EXTRACT USER AND CONVERSATION_ID FROM REQUEST PARAMETERS
    const user = req.user
    const { conversationId } = req.params

    // FETCH ALL MESSAGES ASSOCIATED WITH THE SPECIFIED CONVERSATION_ID
    const messages = await Message.find({ conversationId }).populate('senderId')

    // SEND A SUCCESS RESPONSE WITH THE FETCHED MESSAGES
    res.status(200).json({ SUCCESS: true, MESSAGES: messages })
  } catch (error) {
    // LOG AND SEND AN ERROR RESPONSE WITH A MORE DETAILED MESSAGE
    console.log('API FETCH ALL MESSAGES ERROR: ', error?.message)
    res.status(500).json({ SUCCESS: false, MESSAGE: 'INTERNAL SERVER ERROR' })
  }
}
