"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _userModel = require("../models/user.model.js");

var _userControllers = require("../controllers/user.controllers.js");

var _userMiddleware = require("../middlewares/user.middleware.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var routes = _express["default"].Router(); // USER REGISTRATION!


routes.post('/register', _userControllers.registerUser); // USER LOGIN!!

routes.post('/login', _userControllers.loginUser); // GET ALL USERS!

routes.get('/users', _userMiddleware.authProtection, _userControllers.getAllUsers); // UPDATE USER ROUTE!

routes.put('/user-update', _userMiddleware.authProtection, _userControllers.updateUser); // UPDATE USER BLOCKED TO UNBLOCK OR VIVE VERSA!

routes.put('/block-unblock-user', _userMiddleware.authProtection, _userControllers.blockUnblockUser); // GET ALL BLOCKED USERS!

routes.get('/get-all-blocked-users', _userMiddleware.authProtection, _userControllers.getBlockedUsers); // USER REFRESH/ACCESS!
// USER FORGOT PASSWORD!!
// USER VERIFY EMAIL!
// CREATE STORIES!

routes.post("/create-story", _userMiddleware.authProtection, _userControllers.userStoryCreation); // DELETE STORIES!

routes["delete"]("/delete-story", _userMiddleware.authProtection, _userControllers.storyDeletion);
var _default = routes;
exports["default"] = _default;