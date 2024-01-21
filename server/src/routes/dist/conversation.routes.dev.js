"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _conversationController = require("../controllers/conversation.controller.js");

var _userMiddleware = require("../middlewares/user.middleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = _express["default"].Router(); // CREATE CONVERSATION!


routes.post('/create-conversation', _userMiddleware.authProtection, _conversationController.createConversation); // FETCHING ROUTES

routes.get('/fetch-all', _userMiddleware.authProtection, _conversationController.fetchAllConversations); // FETCHING ALL USER FRIENDS!

routes.get('/fetch-all-friends-conversation', _userMiddleware.authProtection, _conversationController.fetchAllUserConversationsFriends);
var _default = routes;
exports["default"] = _default;