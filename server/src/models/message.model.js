import mongoose from 'mongoose'

// MESSAGE SCHEMA!
const messageSchema = new mongoose.Schema(
  {
    // SENDER ID OF THE MESSAGE!
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    // MESSAGE BODY WHATEVER IT IS!
    message: { type: String, required: true },
    // MESSAGE TYPE WHATEVER (TEXT, IMAGE, FILE)!
    messageType: { type: String, enum: ['text', 'image', 'file'] },
    // SEEN USER IDS!
    seenBy: [String],
    // CONVERSATION ID!
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conversation'
    },
    delivered: { type: Boolean, default: false },
    receiverId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
  },
  {
    timestamps: true
  }
)

// EXPORTING MESSAGE!
export const Message =
  mongoose.models.message || mongoose.model('message', messageSchema)
