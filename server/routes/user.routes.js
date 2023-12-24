import express from 'express'
import { User } from '../models/user.model'
import { registerUser } from '../controllers/user.controllers'
import { authProtection } from '../middlewares/user.middleware'

const routes = express.Router()

// USER REGISTRATION!
routes.post('/register', authProtection, registerUser)

// USER LOGIN!!

// USER REFRESH/ACCESS!

// USER FORGOT PASSWORD!!

// USER VERIFY EMAIL!

export default routes
