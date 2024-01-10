import mongoose from 'mongoose'

// CONVERSATION SCHEMA!
const conversationSchema = new mongoose.Schema(
  {
    // USERS!
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    // LAST MESSAGE!
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'message' },
    unreadCount: { type: mongoose.Schema.Types.ObjectId, ref: 'unreadcount' },
    group: { type: Boolean, default: false },
    groupName: {
      type: String,
      default:
        'A' +
        Math.random() * 3 +
        'B' +
        Math.random() * 3 +
        'Z' +
        Math.random() * 3 +
        'Y'
    },
    avatar: {
      type: String,
      default:
        'https://icons.veryicon.com/png/o/education-technology/cloud-platform-1/group-icon.png'
    }
  },
  {
    timestamps: true
  }
)

// CONVERSATION!
export const Conversation =
  mongoose.models.conversation ||
  mongoose.model('conversation', conversationSchema)
