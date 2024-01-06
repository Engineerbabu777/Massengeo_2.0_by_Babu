"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllConversations = exports.createConversation = void 0;

var _conversationModel = require("../models/conversation.model.js");

var _messageModel = require("../models/message.model.js");

var createConversation = function createConversation(req, res) {
  var userId, requestedUserID, newConversation;
  return regeneratorRuntime.async(function createConversation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // EXTRACT USER IDS FROM REQUEST BODY (FOR NOW, SUPPORTING ONLY SINGLE CONVERSATION!)
          userId = req.body.userId; // USER ID OF THE REQUESTING USER WHO IS CREATING THE CONVERSATION

          requestedUserID = req.user._id; // CREATE A NEW CONVERSATION IN THE DATABASE

          _context.next = 5;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.create({
            users: [requestedUserID, userId]
          }));

        case 5:
          newConversation = _context.sent;
          // RETURN A SUCCESSFUL RESPONSE WITH A STATUS OF 201 CREATED
          res.status(201).json({
            success: true,
            message: 'Conversation created successfully'
          });
          _context.next = 13;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          // LOG AND HANDLE ERROR IF CREATION FAILS
          console.log('Creating Conversation Error: ', _context.t0.message); // RETURN AN ERROR RESPONSE WITH A STATUS OF 504 GATEWAY TIMEOUT

          res.status(504).json({
            error: true,
            message: 'Conversation creation failed'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // FETCH ALL CONVERSATIONS CONTROLLER


exports.createConversation = createConversation;

var fetchAllConversations = function fetchAllConversations(req, res) {
  var data, conversations;
  return regeneratorRuntime.async(function fetchAllConversations$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_messageModel.Message.updateMany({
            receiverId: req.user._id,
            // MEANS THOSE MESSAGE THAT WHERE SEND TO THIS USER WILL BE DELIVERED FOR OTHERS!
            delivered: false // FINDING BOTH CONDITIONS TO BE TRUE!

          }, {
            delivered: true // LATE WE WILL UPDATE IT TO ARRAY LIKE SEEN BY HAVING!

          }, {
            "new": true
          }));

        case 3:
          data = _context2.sent;
          console.log({
            "new": data
          }); // RETRIEVE ALL CONVERSATIONS FROM THE DATABASE WHERE THE REQUESTING USER ID IS INCLUDED!!

          _context2.next = 7;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.find({
            users: {
              $in: [req.user._id]
            }
          }).populate('users lastMessage').sort({
            updatedAt: -1
          }));

        case 7:
          conversations = _context2.sent;
          // RETURN A SUCCESSFUL RESPONSE WITH A STATUS OF 200 OK AND THE FETCHED CONVERSATIONS!!
          res.status(200).json({
            success: true,
            message: 'Conversations fetched successfully',
            conversations: conversations
          });
          _context2.next = 15;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          // LOG AND HANDLE ERROR IF FETCHING FAILS!!
          console.log('Fetching Conversations Error: ', _context2.t0.message); // RETURN AN ERROR RESPONSE WITH A STATUS OF 504 GATEWAY TIMEOUT!!

          res.status(504).json({
            error: true,
            message: 'Conversations fetching failed'
          });

        case 15:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.fetchAllConversations = fetchAllConversations;