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

// ALL IMPORTS!
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
app.use('/api/v1/messages', _messagesRoutes["default"]); // ON SOCKET CONNECTION!!

socket.on('connection', function (client) {
  console.log('Client Connected!');
  client.on('message-sent', function (message) {
    console.log(message);
    socket.emit('message-received', {
      message: message,
      clientId: client.id
    });
  }); // ON USER DISCONNECTED!

  client.on('disconnect', function () {
    console.log('user disconnected');
  });
}); // RUNNING EXPRESS APP ON PORT: 4444

server.listen(4444, function () {
  console.log('Listening on Port: 4444');
});