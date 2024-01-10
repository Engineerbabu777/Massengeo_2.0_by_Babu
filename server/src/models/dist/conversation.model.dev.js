"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Conversation = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// CONVERSATION SCHEMA!
var conversationSchema = new _mongoose["default"].Schema({
  // USERS!
  users: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'user'
  }],
  // LAST MESSAGE!
  lastMessage: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'message'
  },
  unreadCount: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'unreadcount'
  },
  group: {
    type: Boolean,
    "default": false
  },
  groupName: {
    type: String,
    "default": 'A' + Math.floor(Math.random() * 3 + 3) + 'B' + Math.floor(Math.random() * 3 + 6) + 'Z' + Math.floor(Math.random() * 12 - 4) + 'Y'
  },
  avatar: {
    type: String,
    "default": 'https://icons.veryicon.com/png/o/education-technology/cloud-platform-1/group-icon.png'
  }
}, {
  timestamps: true
}); // CONVERSATION!

var Conversation = _mongoose["default"].models.conversation || _mongoose["default"].model('conversation', conversationSchema);

exports.Conversation = Conversation;