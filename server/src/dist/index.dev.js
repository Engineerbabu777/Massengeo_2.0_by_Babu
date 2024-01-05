"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireDefault(require("express"));

var _userRoutes = _interopRequireDefault(require("./routes/user.routes.js"));

var dotenv = _interopRequireWildcard(require("dotenv"));

var _databaseConnect = require("./db/databaseConnect.js");

var _cors = _interopRequireDefault(require("cors"));

var _conversationRoutes = _interopRequireDefault(require("./routes/conversation.routes.js"));

var _messagesRoutes = _interopRequireDefault(require("./routes/messages.routes.js"));

var _socket = require("socket.io");

var _http = require("http");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

socket.on('connection', function (client) {
  // WHEN USER COMES ACTIVE/ONLINE!
  client.on('update-user-is-online-now', function (_ref) {
    var userId = _ref.userId,
        clientId = _ref.clientId;
    onlineUsers[clientId] = userId; // EMIT AN EVENT ABOUT NEW ACTIVE USERS!!

    socket.emit('update-active-users', {
      onlineUsers: onlineUsers,
      clientId: client.id
    });
  }); // UPDATE THE REALTIME CONVERSATIONS!!

  client.on('message-sent', function (data) {
    console.log(data);
    socket.emit('message-received', {
      data: data,
      clientId: client.id
    });
  }); // UPDATE SEEN ON REALTIME!

  client.on('message-read-by-user', function (_ref2) {
    var newMessage = _ref2.newMessage,
        conversationId = _ref2.conversationId,
        userIdToAdd = _ref2.userIdToAdd;
    socket.emit('mark-message-as-read', {
      newMessage: newMessage,
      conversationId: conversationId,
      clientId: client.id,
      userIdToAdd: userIdToAdd
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
      clientId: client.id
    });
  });
}); // RUNNING EXPRESS APP ON PORT: 4444

server.listen(4444, function () {
  console.log('Listening on Port: 4444');
});