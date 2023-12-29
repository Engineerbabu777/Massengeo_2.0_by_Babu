import { Conversation } from '../models/conversation.model.js'
import { Message } from '../models/message.model.js'

// SEND MESSAGES ROUTES!
export const sendMessage = async(req, res) => {
  try {
    const user = req.user
    const { message, conversationId, messageType } = req.body

    // CREATE A NEW MESSAGE!
    const newMessage = await Message.create({
      message,
      senderId: user._id,
      conversationId,
      messageType
    })

    // UPDATE LAST MESSAGE IN CONVERSATION!
    const updatedConversation = await Conversation.findByIdAndUpdate(conversationId,{
      lastMessage: newMessage,
    })

    res
      .status(201)
      .json({ success: true, message: 'message send successfully!' })
    // SEND RESPONSE BACK!
  } catch (error) {
    console.log('API SEND MESSAGE ERROR: ', error?.message)
  }
}
