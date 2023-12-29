import express from 'express'
import {
  createConversation,
  fetchAllConversations
} from '../controllers/conversation.controller.js'
import { authProtection } from '../middlewares/user.middleware.js'

const routes = express.Router()

// CREATE CONVERSATION!
routes.post('/create-conversation', authProtection, createConversation)

// FETCHING ROUTES
routes.get('/fetch-all', authProtection, fetchAllConversations)


export default routes
