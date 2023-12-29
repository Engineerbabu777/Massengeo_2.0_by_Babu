import express from 'express'
import {
  sendMessage,
  fetchAllMessages
} from '../controllers/messages.controllers.js'
import { authProtection } from '../middlewares/user.middleware.js'
const routes = express.Router()

// SEND MESSAGES ROUTE!
routes.post('/send-message', authProtection, sendMessage)

// FETCH ALL MESSAGE BY CONVERSATION!
routes.get('/get-messages/:conversationId', authProtection, fetchAllMessages)

export default routes
