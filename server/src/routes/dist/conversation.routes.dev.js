"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _conversationController = require("../controllers/conversation.controller.js");

var _userMiddleware = require("../middlewares/user.middleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = _express["default"].Router(); // USER REGISTRATION!


routes.post('/create-conversation', _userMiddleware.authProtection, _conversationController.createConversation);
var _default = routes;
exports["default"] = _default;