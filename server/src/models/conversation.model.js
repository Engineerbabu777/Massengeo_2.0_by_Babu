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
        Math.floor(Math.random() * 3 + 3) +
        'B' +
        Math.floor(Math.random() * 3 + 6) +
        'Z' +
        Math.floor(Math.random() * 12 - 4) +
        'Y'
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/djo2k58eq/image/upload/v1706265217/new-data/rmdodqssscry9ohnecvf.png'
    },
    groupAdmins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    groupType: {
      type: String,
      default: 'public',
      enum: ['public', 'private', 'restricted']
    },
    about: String,
    ChatStatusForPreviousMembers: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, // THOSE WHO LEAVED THE GROUP OR REMOVED FROM THE GROUP!
        groupName: String,
        avatar: String,
        about: String,
        groupMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] // ARRAY OF THOSE WHO WHERE PARTICIPANTS THAT TIME!!
      }
    ],
    leavedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }] // ARRAY OF THOSE NO LONGER PARTICIPANTS!
  },
  {
    timestamps: true
  }
)

// CONVERSATION!
export const Conversation =
  mongoose.models.conversation ||
  mongoose.model('conversation', conversationSchema)
