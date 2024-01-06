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
    "enum": ['text', 'image', 'file']
  },
  // SEEN USER IDS!
  seenBy: [String],
  // CONVERSATION ID!
  conversationId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'conversation'
  },
  delivered: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
}); // EXPORTING MESSAGE!

var Message = _mongoose["default"].models.message || _mongoose["default"].model('message', messageSchema);

exports.Message = Message;