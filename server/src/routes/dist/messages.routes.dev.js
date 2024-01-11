"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _messagesControllers = require("../controllers/messages.controllers.js");

var _userMiddleware = require("../middlewares/user.middleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = _express["default"].Router(); // SEND MESSAGES ROUTE!


routes.post('/send-message', _userMiddleware.authProtection, _messagesControllers.sendMessage); // FETCH ALL MESSAGE BY CONVERSATION!

routes.get('/get-messages/:conversationId', _userMiddleware.authProtection, _messagesControllers.fetchAllMessages); // UPDATE READ MESSAGES!

routes.put('/update-read-message/:conversationId/:messageId', _userMiddleware.authProtection, _messagesControllers.readTheMessageThatWasSent); // UPDATE MESSAGE!

routes.put('/update-message', _userMiddleware.authProtection, _messagesControllers.updateMessage);
var _default = routes;
exports["default"] = _default;