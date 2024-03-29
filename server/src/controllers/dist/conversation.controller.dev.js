"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupConversationUpdate = exports.fetchAllUserConversationsFriends = exports.fetchAllConversations = exports.createConversation = void 0;

var _conversationModel = require("../models/conversation.model.js");

var _messageModel = require("../models/message.model.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var createConversation = function createConversation(req, res) {
  var _req$body, userIds, group, requestedUserID, existingConversation, newConversation;

  return regeneratorRuntime.async(function createConversation$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          // EXTRACT USER IDS FROM REQUEST BODY (FOR NOW, SUPPORTING ONLY SINGLE CONVERSATION!)
          _req$body = req.body, userIds = _req$body.userIds, group = _req$body.group; // USER ID OF THE REQUESTING USER WHO IS CREATING THE CONVERSATION

          requestedUserID = req.user._id; // CHECK IF THERE IS EXISTING CONVERSATION WITH THESE ONE!

          _context.next = 5;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.findOne({
            users: {
              $all: !group ? [userIds, requestedUserID] : [].concat(_toConsumableArray(userIds), [requestedUserID])
            },
            // IF USERS CONTAINS ALL OF THESE IDS THEN CONVERSATION EXISTS!
            group: group
          }));

        case 5:
          existingConversation = _context.sent;

          if (!existingConversation) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.status(200).json({
            message: 'Conversation already exists!',
            conversation: existingConversation
          }));

        case 8:
          if (!group) {
            _context.next = 13;
            break;
          }

          _context.next = 11;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.create({
            users: [].concat(_toConsumableArray(userIds), [requestedUserID]),
            group: true,
            groupAdmins: [requestedUserID]
          }));

        case 11:
          _context.next = 22;
          break;

        case 13:
          _context.next = 15;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.create({
            users: [requestedUserID, userIds]
          }));

        case 15:
          newConversation = _context.sent;
          _context.t0 = res.status(201);
          _context.next = 19;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.findById(newConversation._id).populate('lastMessage unreadCount groupAdmins').populate({
            path: 'users',
            select: 'email avatar username about blockedList'
          }));

        case 19:
          _context.t1 = _context.sent;
          _context.t2 = {
            success: true,
            message: 'Conversation created successfully',
            newConversation: _context.t1
          };
          return _context.abrupt("return", _context.t0.json.call(_context.t0, _context.t2));

        case 22:
          _context.next = 28;
          break;

        case 24:
          _context.prev = 24;
          _context.t3 = _context["catch"](0);
          // LOG AND HANDLE ERROR IF CREATION FAILS
          console.log('Creating Conversation Error: ', _context.t3.message); // RETURN AN ERROR RESPONSE WITH A STATUS OF 504 GATEWAY TIMEOUT

          res.status(504).json({
            error: true,
            message: 'Conversation creation failed'
          });

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 24]]);
}; // FETCH ALL CONVERSATIONS CONTROLLER


exports.createConversation = createConversation;

var fetchAllConversations = function fetchAllConversations(req, res) {
  var conversations;
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
          _context2.next = 5;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.find({
            users: {
              $in: [req.user._id]
            }
          }).populate('users unreadCount groupAdmins').populate({
            path: 'lastMessage',
            populate: 'senderId'
          }).sort({
            updatedAt: -1
          }));

        case 5:
          conversations = _context2.sent;
          // RETURN A SUCCESSFUL RESPONSE WITH A STATUS OF 200 OK AND THE FETCHED CONVERSATIONS!!
          res.status(200).json({
            success: true,
            message: 'Conversations fetched successfully',
            conversations: conversations
          });
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          // LOG AND HANDLE ERROR IF FETCHING FAILS!!
          console.log('Fetching Conversations Error: ', _context2.t0.message); // RETURN AN ERROR RESPONSE WITH A STATUS OF 504 GATEWAY TIMEOUT!!

          res.status(504).json({
            error: true,
            message: 'Conversations fetching failed'
          });

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; // FETCH USERS INVOLVED IN SINGLE CHAT WITH REQUESTED USERS


exports.fetchAllConversations = fetchAllConversations;

var fetchAllUserConversationsFriends = function fetchAllUserConversationsFriends(req, res) {
  var conversations, friends;
  return regeneratorRuntime.async(function fetchAllUserConversationsFriends$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.find({
            users: {
              $in: [req.user._id]
            },
            group: false
          }).select('users').populate({
            path: 'users',
            select: 'username avatar'
          }));

        case 3:
          conversations = _context3.sent;
          // FROM ALL CONVERSATION GET OTHER USERS IN AN ARRAY CONTAINING USERS OBJECT!
          friends = conversations.map(function (conversation) {
            return conversation.users.filter(function (user) {
              return user._id.toString() !== req.user._id.toString();
            });
          }); // RETURN A SUCCESSFUL RESPONSE WITH A STATUS OF 200 OK AND THE FETCHED FRIENDS!!

          res.status(200).json({
            success: true,
            message: 'Friends fetched successfully',
            friends: friends.flat()
          });
          _context3.next = 12;
          break;

        case 8:
          _context3.prev = 8;
          _context3.t0 = _context3["catch"](0);
          // LOG AND HANDLE ERROR IF FETCHING FAILS!!
          console.log('Fetching Friends Error: ', _context3.t0.message); // RETURN AN ERROR RESPONSE WITH A STATUS OF 504 GATEWAY TIMEOUT!!

          res.status(504).json({
            error: true,
            message: 'Friends fetching failed'
          });

        case 12:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // UPDATE GROUP CONVERSATION!


exports.fetchAllUserConversationsFriends = fetchAllUserConversationsFriends;

var groupConversationUpdate = function groupConversationUpdate(req, res) {
  var user, userId, data, conversation, group;
  return regeneratorRuntime.async(function groupConversationUpdate$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          // GET THE ID OF USER!
          user = req.user;
          userId = user._id; // REQUEST BODY!

          data = req.body;
          console.log({
            data: data,
            userId: userId
          }); // CHECK IF THE USER IS THE ADMIN OF THE GROUP!

          _context4.next = 7;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.findById(data.groupId));

        case 7:
          conversation = _context4.sent;

          if (conversation.groupAdmins.includes(userId)) {
            _context4.next = 10;
            break;
          }

          return _context4.abrupt("return", res.status(401).json({
            error: true,
            message: 'You are not the admin of this group!'
          }));

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(_conversationModel.Conversation.findByIdAndUpdate(data.groupId, _defineProperty({}, data.updateType, data.updateValue), {
            "new": true
          }));

        case 12:
          group = _context4.sent;
          // RETURN SUCCESS RESPONSE!
          res.status(200).json({
            message: "Updated Success",
            success: true,
            data: group
          });
          _context4.next = 20;
          break;

        case 16:
          _context4.prev = 16;
          _context4.t0 = _context4["catch"](0);
          console.log('Group Update Error:', _context4.t0.message);
          res.status(200).json({
            message: "Group update failed!",
            error: true
          });

        case 20:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // REMOVE USERS FROM THE CONVERSATIONS!


exports.groupConversationUpdate = groupConversationUpdate;