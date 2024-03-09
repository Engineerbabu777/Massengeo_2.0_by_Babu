"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var userSchema = new _mongoose["default"].Schema({
  username: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  avatar: {
    type: String,
    "default": 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
  },
  about: String,
  blockedList: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'user'
  }],
  stories: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'story'
  }]
}, {
  timestamps: true
});

var User = _mongoose["default"].models.user || _mongoose["default"].model('user', userSchema);

exports.User = User;