import express from 'express'
import {
  sendMessage,
  fetchAllMessages,
  readTheMessageThatWasSent,
  updateMessage
} from '../controllers/messages.controllers.js'
import { authProtection } from '../middlewares/user.middleware.js'
const routes = express.Router()

// SEND MESSAGES ROUTE!
routes.post('/send-message', authProtection, sendMessage)

// FETCH ALL MESSAGE BY CONVERSATION!
routes.get('/get-messages/:conversationId', authProtection, fetchAllMessages)

// UPDATE READ MESSAGES!
routes.put(
  '/update-read-message/:conversationId/:messageId',
  authProtection,
  readTheMessageThatWasSent
)

// UPDATE MESSAGE!
routes.put('/update-message', authProtection, updateMessage)

export default routes
