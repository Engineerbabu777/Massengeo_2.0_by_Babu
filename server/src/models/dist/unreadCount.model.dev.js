"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnreadCount = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var unreadCountSchema = new _mongoose["default"].Schema({
  // User ID as the key (Object ID type)
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'user',
    unique: true
  },
  // Number of unread messages as the value (String or Number, depending on your preference)
  count: {
    type: String,
    "default": '0'
  }
});

var UnreadCount = _mongoose["default"].model('unreadCount', unreadCountSchema);

exports.UnreadCount = UnreadCount;