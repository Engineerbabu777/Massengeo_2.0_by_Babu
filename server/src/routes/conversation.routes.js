import express from 'express'
import {
  createConversation,
  fetchAllConversations,
  fetchAllUserConversationsFriends,
  groupConversationUpdate,
  memberRemovalOrLeave
} from '../controllers/conversation.controller.js'
import { authProtection } from '../middlewares/user.middleware.js'

const routes = express.Router()

// POST ROUTES!
routes.post('/create-conversation', authProtection, createConversation)

// FETCHING ROUTES
routes.get('/fetch-all', authProtection, fetchAllConversations)
routes.get(
  '/fetch-all-friends-conversation',
  authProtection,
  fetchAllUserConversationsFriends
)

// PUT ROUTES!
routes.put('/update-group', authProtection, groupConversationUpdate)

// DELETE ROUTES!
routes.delete('/delete-group-member', authProtection, memberRemovalOrLeave)

export default routes
