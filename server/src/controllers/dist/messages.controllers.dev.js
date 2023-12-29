"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendMessages = void 0;

// SEND MESSAGES ROUTES!
var sendMessages = function sendMessages(req, res) {
  var user = req.user;
  var _req$body = req.body,
      message = _req$body.message,
      receiverId = _req$body.receiverId,
      type = _req$body.type;

  try {} catch (error) {}
};

exports.sendMessages = sendMessages;