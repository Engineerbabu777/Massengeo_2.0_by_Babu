"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Story = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storySchema = new _mongoose["default"].Schema({
  userId: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'user'
  },
  storyText: String,
  backgroundColor: String,
  fontFamily: String,
  textColor: String,
  storyType: String,
  statusImage: String
});

var Story = _mongoose["default"].model('Story', storySchema);

exports.Story = Story;