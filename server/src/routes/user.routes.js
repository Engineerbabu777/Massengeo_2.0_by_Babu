import express from 'express'
import { User } from '../models/user.model.js'
import {
  blockUnblockUser,
  getAllUsers,
  getBlockedUsers,
  loginUser,
  registerUser,
  storyDeletion,
  updateUser,
  userStoryCreation
} from '../controllers/user.controllers.js'
import { authProtection } from '../middlewares/user.middleware.js'

const routes = express.Router()

// USER REGISTRATION!
routes.post('/register', registerUser)

// USER LOGIN!!
routes.post('/login', loginUser)

// GET ALL USERS!
routes.get('/users', authProtection, getAllUsers)

// UPDATE USER ROUTE!
routes.put('/user-update', authProtection, updateUser)

// UPDATE USER BLOCKED TO UNBLOCK OR VIVE VERSA!
routes.put('/block-unblock-user', authProtection, blockUnblockUser)

// GET ALL BLOCKED USERS!
routes.get('/get-all-blocked-users', authProtection, getBlockedUsers)
// USER REFRESH/ACCESS!

// USER FORGOT PASSWORD!!

// USER VERIFY EMAIL!

// CREATE STORIES!
routes.post("/create-story", authProtection, userStoryCreation)
// DELETE STORIES!
routes.delete("/delete-story", authProtection, storyDeletion)

export default routes
