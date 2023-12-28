"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConversation = void 0;

var _conversationModel = require("../models/conversation.model.js");

var createConversation = function createConversation(req, res) {
  var userId, requestedUserID, newConversation;
  return regeneratorRuntime.async(function createConversation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // USER IDS (FOR NOW SINGLE CONVERSATION!)!
          userId = req.body.userId; // USER ID OF CREATING CONVERSATION!

          requestedUserID = req.user._id; // CREATE CONVERSATION!

          _context.next = 5;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.create({
            users: [requestedUserID, userId]
          }));

        case 5:
          newConversation = _context.sent;
          res.status(201).json({
            success: true,
            message: 'conversation created successfully'
          });
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log('Creating Conversation Error: ', err.message);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.createConversation = createConversation;