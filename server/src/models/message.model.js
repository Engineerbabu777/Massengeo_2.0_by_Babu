import mongoose from 'mongoose'

// MESSAGE SCHEMA!
const messageSchema = new mongoose.Schema(
  {
    // SENDER ID OF THE MESSAGE!
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    // MESSAGE BODY WHATEVER IT IS!
    message: { type: String, required: true },
    // MESSAGE TYPE WHATEVER (TEXT, IMAGE, FILE)!
    messageType: { type: String, enum: ['text', 'image', 'file','image-text'] },
    // SEEN USER IDS!
    seenBy: [String],
    // CONVERSATION ID!
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'conversation'
    },
    image:{type:String},
    // IS THE MESSAGE IS EDITED!
    isEdited: { type: Boolean, default: false },
    // CHECK THE DELIVERY STATUS OF MESSAGE!
    delivered: { type: Boolean, default: false },
    // RECEIVER IDS (ARRAY)!
    receiverId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    // IS THIS MESSAGE IS IN ANY GROUPS!
    isGroupMessage: Boolean,
    // MESSAGE DELETED OPTIONS!
    deleteForMe: { type: Boolean, default: false },
    deleteForEveryOne: { type: Boolean, default: false },
    message_accessed_by: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    // REMOVAL MESSAGE / LEAVE MESSAGE,
    isLeaveOrRemoval:{type:Boolean,default:false},
    leaveOrRemovalData:{
      userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
      removalType: String
    }
  },
  {
    timestamps: true
  }
)

// EXPORTING MESSAGE!
export const Message =
  mongoose.models.message || mongoose.model('message', messageSchema)
