"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchAllConversations = exports.createConversation = void 0;

var _conversationModel = require("../models/conversation.model.js");

var _messageModel = require("../models/message.model.js");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var createConversation = function createConversation(req, res) {
  var _req$body, userIds, group, requestedUserID;

  return regeneratorRuntime.async(function createConversation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // EXTRACT USER IDS FROM REQUEST BODY (FOR NOW, SUPPORTING ONLY SINGLE CONVERSATION!)
          _req$body = req.body, userIds = _req$body.userIds, group = _req$body.group; // USER ID OF THE REQUESTING USER WHO IS CREATING THE CONVERSATION

          requestedUserID = req.user._id; // CREATE A NEW CONVERSATIONS IN THE DATABASE

          if (!group) {
            _context.next = 8;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.create({
            users: [].concat(_toConsumableArray(userIds), [requestedUserID]),
            group: true
          }));

        case 6:
          _context.next = 10;
          break;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.create({
            users: [requestedUserID, userIds]
          }));

        case 10:
          // RETURN A SUCCESSFUL RESPONSE WITH A STATUS OF 201 CREATED
          res.status(201).json({
            success: true,
            message: 'Conversation created successfully'
          });
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](0);
          // LOG AND HANDLE ERROR IF CREATION FAILS
          console.log('Creating Conversation Error: ', _context.t0.message); // RETURN AN ERROR RESPONSE WITH A STATUS OF 504 GATEWAY TIMEOUT

          res.status(504).json({
            error: true,
            message: 'Conversation creation failed'
          });

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 13]]);
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
          _context2.next = 6;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.find({
            users: {
              $in: [req.user._id]
            }
          }).populate('users lastMessage unreadCount').sort({
            updatedAt: -1
          }));

        case 6:
          conversations = _context2.sent;
          // RETURN A SUCCESSFUL RESPONSE WITH A STATUS OF 200 OK AND THE FETCHED CONVERSATIONS!!
          res.status(200).json({
            success: true,
            message: 'Conversations fetched successfully',
            conversations: conversations
          });
          _context2.next = 14;
          break;

        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          // LOG AND HANDLE ERROR IF FETCHING FAILS!!
          console.log('Fetching Conversations Error: ', _context2.t0.message); // RETURN AN ERROR RESPONSE WITH A STATUS OF 504 GATEWAY TIMEOUT!!

          res.status(504).json({
            error: true,
            message: 'Conversations fetching failed'
          });

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

exports.fetchAllConversations = fetchAllConversations;