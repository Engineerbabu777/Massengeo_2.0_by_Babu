"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// MESSAGE SCHEMA!
var messageSchema = new _mongoose["default"].Schema({
  // SENDER ID OF THE MESSAGE!
  senderId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'user'
  },
  // MESSAGE BODY WHATEVER IT IS!
  message: {
    type: String,
    required: true
  },
  // MESSAGE TYPE WHATEVER (TEXT, IMAGE, FILE)!
  messageType: {
    type: String,
    "enum": ['text', 'image', 'file', 'image-text']
  },
  // SEEN USER IDS!
  seenBy: [String],
  // CONVERSATION ID!
  conversationId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'conversation'
  },
  image: {
    type: String
  },
  // IS THE MESSAGE IS EDITED!
  isEdited: {
    type: Boolean,
    "default": false
  },
  // CHECK THE DELIVERY STATUS OF MESSAGE!
  delivered: {
    type: Boolean,
    "default": false
  },
  // RECEIVER IDS (ARRAY)!
  receiverId: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'user'
  }],
  // IS THIS MESSAGE IS IN ANY GROUPS!
  isGroupMessage: Boolean,
  // MESSAGE DELETED OPTIONS!
  deleteForMe: {
    type: Boolean,
    "default": false
  },
  deleteForEveryOne: {
    type: Boolean,
    "default": false
  },
  message_accessed_by: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'user'
  }],
  // REMOVAL MESSAGE / LEAVE MESSAGE,
  isLeaveOrRemoval: {
    type: Boolean,
    "default": false
  },
  leaveOrRemovalData: {
    userId: {
      type: _mongoose["default"].Schema.Types.ObjectId,
      ref: 'user'
    },
    removalType: String
  },
  storyId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'story'
  },
  isStoryReply: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
}); // EXPORTING MESSAGE!

var Message = _mongoose["default"].models.message || _mongoose["default"].model('message', messageSchema);

exports.Message = Message;