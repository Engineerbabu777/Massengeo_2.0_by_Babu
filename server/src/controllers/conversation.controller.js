import { Conversation } from '../models/conversation.model.js'

export const createConversation = async (req, res) => {
  try {
    // USER IDS (FOR NOW SINGLE CONVERSATION!)!
    const { userId } = req.body
    // USER ID OF CREATING CONVERSATION!
    const requestedUserID = req.user._id

    // CREATE CONVERSATION!
    const newConversation = await Conversation.create({
      users: [requestedUserID, userId]
    })

    res
      .status(201)
      .json({ success: true, message: 'conversation created successfully' })
  } catch (error) {
    console.log('Creating Conversation Error: ', err.message)
  }
}
