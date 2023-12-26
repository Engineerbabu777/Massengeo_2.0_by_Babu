import express from 'express'
import { User } from '../models/user.model.js'
import {
  getAllUsers,
  loginUser,
  registerUser
} from '../controllers/user.controllers.js'
import { authProtection } from '../middlewares/user.middleware.js'

const routes = express.Router()

// USER REGISTRATION!
routes.post('/register', registerUser)

// USER LOGIN!!
routes.post('/login', loginUser)

// GET ALL USERS!
routes.get('/users', authProtection, getAllUsers)

// USER REFRESH/ACCESS!

// USER FORGOT PASSWORD!!

// USER VERIFY EMAIL!

export default routes
