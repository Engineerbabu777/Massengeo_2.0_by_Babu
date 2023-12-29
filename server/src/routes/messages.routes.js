import express from 'express'
import { sendMessage } from '../controllers/messages.controllers.js'
import { authProtection } from '../middlewares/user.middleware.js'
const routes = express.Router()

// SEND MESSAGES ROUTE!
routes.post('/send-message', authProtection, sendMessage)

export default routes
