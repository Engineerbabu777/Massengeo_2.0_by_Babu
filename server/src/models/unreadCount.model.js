import mongoose from 'mongoose'

const unreadCountSchema = new mongoose.Schema({
  conversationId: { type: mongoose.Schema.Types.ObjectId, ref: 'conversation' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  count: { type: Number, default: 0 }
})

export const UnreadCount =
  mongoose?.models?.unreadcount ||
  mongoose.model('unreadcount', unreadCountSchema)
