import express from 'express'
import { User } from '../models/user.model.js'
import {
  blockUnblockUser,
  getAllUsers,
  loginUser,
  registerUser,
  updateUser
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

// USER REFRESH/ACCESS!

// USER FORGOT PASSWORD!!

// USER VERIFY EMAIL!

export default routes
