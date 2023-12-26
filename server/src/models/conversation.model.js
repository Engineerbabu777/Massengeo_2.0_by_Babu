import mongoose from 'mongoose'

// CONVERSATION SCHEMA!
const conversationSchema = new mongoose.Schema(
  {
    // USERS!
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    // LAST MESSAGE!
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'message' }
  },
  {
    timestamps: true
  }
)

// CONVERSATION!
export const Conversation =
  mongoose.models.conversation ||
  mongoose.model('conversation', conversationSchema)
