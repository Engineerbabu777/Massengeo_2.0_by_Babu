"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlineUsers = void 0;

var _express = _interopRequireDefault(require("express"));

var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));

var dotenv = _interopRequireWildcard(require("dotenv"));

var _databaseConnect = require("./db/databaseConnect.js");

var _cors = _interopRequireDefault(require("cors"));

var _conversationRoutes = _interopRequireDefault(require("./routes/conversation.routes.js"));

var _messagesRoutes = _interopRequireDefault(require("./routes/messages.routes.js"));

var _socket = require("socket.io");

var _http = require("http");

var _messageModel = require("./models/message.model.js");

var _unreadCountModel = require("./models/unreadCount.model.js");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

dotenv.config(); // CREATING EXPRESS APP!

var app = (0, _express["default"])(); // CREATING HTTP SERVER!

var server = (0, _http.createServer)(app); // CREATING SOCKET WEB SERVER!

var socket = new _socket.Server(server, {
  cors: {
    origin: '*'
  }
}); // DATABASE CONNECT!

(0, _databaseConnect.databaseConnect)(); // REQUIRED MIDDLEWARES!

app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use((0, _cors["default"])()); // USER ROUTES!!

app.use('/api/v1/user', _userRoutes["default"]);
app.use('/api/v1/conversation', _conversationRoutes["default"]);
app.use('/api/v1/messages', _messagesRoutes["default"]); // ONLINE USERS IDS!

var onlineUsers = {}; // ON SOCKET CONNECTION!!

exports.onlineUsers = onlineUsers;
socket.on('connection', function (client) {
  // WHEN USER COMES ACTIVE/ONLINE!
  client.on('update-user-is-online-now', function (_ref) {
    var userId = _ref.userId,
        clientId = _ref.clientId,
        username = _ref.username;
    onlineUsers[client.id] = userId; // EMIT AN EVENT ABOUT NEW ACTIVE USERS!!

    socket.emit('update-active-users', {
      onlineUsers: onlineUsers,
      clientId: client.id,
      username: username,
      offline: false
    });
  }); // UPDATE THE REALTIME MESSAGE SENT/RECEIVED!!

  client.on('message-sent', function (data) {
    console.log(data);
    socket.emit('message-received', {
      data: data,
      clientId: client.id
    });
  }); // UPDATE MESSAGE ON REALTIME!!!

  client.on('message-edited', function (data) {
    socket.emit('edited-message-received', {
      data: data,
      clientId: client.id
    });
  }); // UPDATE SEEN ON REALTIME!

  client.on('message-read-by-user', function _callee(_ref2) {
    var newMessage, conversationId, userIdToAdd;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            newMessage = _ref2.newMessage, conversationId = _ref2.conversationId, userIdToAdd = _ref2.userIdToAdd;
            _context.next = 3;
            return regeneratorRuntime.awrap(_messageModel.Message.findByIdAndUpdate(newMessage._id, {
              seenBy: [].concat(_toConsumableArray(newMessage.seenBy), [userIdToAdd])
            }));

          case 3:
            socket.emit('mark-message-as-read', {
              newMessage: newMessage,
              conversationId: conversationId,
              clientId: client.id,
              userIdToAdd: userIdToAdd
            });

          case 4:
          case "end":
            return _context.stop();
        }
      }
    });
  }); // UPDATING UNREAD MESSAGES COUNT FOR SPECIFIC CONVERSATION !!

  client.on('update-unread-count-to-0', function _callee2(_ref3) {
    var conversationId, userId;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            conversationId = _ref3.conversationId, userId = _ref3.userId;
            _context2.next = 3;
            return regeneratorRuntime.awrap(_unreadCountModel.UnreadCount.findOneAndUpdate({
              conversationId: conversationId,
              userId: userId
            }, {
              count: 0
            }));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    });
  }); // MARK ALL UNREAD AS READ!

  client.on('marked-all-unread-as-read', function (data) {
    socket.emit('update-as-read', _objectSpread({}, data, {
      clientId: client.id
    }));
  }); // ON USER DISCONNECTED!

  client.on('disconnect', function (data) {
    console.log('user disconnected'); // UPDATE THE ONLINE USERS (BY DELETING)!

    delete onlineUsers[client.id];
    socket.emit('update-active-users', {
      onlineUsers: onlineUsers,
      clientId: client.id,
      offline: true
    });
  });
}); // RUNNING EXPRESS APP ON PORT: 4444

server.listen(4444, function () {
  console.log('Listening on Port: 4444');
});