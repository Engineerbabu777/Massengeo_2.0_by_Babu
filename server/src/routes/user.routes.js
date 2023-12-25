import express from 'express'
import { User } from '../models/user.model.js'
import { registerUser } from '../controllers/user.controllers.js'
import { authProtection } from '../middlewares/user.middleware.js'

const routes = express.Router()

// USER REGISTRATION!
routes.post('/register', authProtection, registerUser)

// USER LOGIN!!

// USER REFRESH/ACCESS!

// USER FORGOT PASSWORD!!

// USER VERIFY EMAIL!

export default routes
