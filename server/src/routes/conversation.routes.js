import express from 'express'
import { createConversation } from '../controllers/conversation.controller.js'
import { authProtection } from '../middlewares/user.middleware.js'

const routes = express.Router()

// USER REGISTRATION!
routes.post('/create-conversation', authProtection, createConversation)

export default routes
