// ALL IMPORTS!
import express from 'express'
import userRoutes from './routes/user.routes.js'
import * as dotenv from 'dotenv'
import { databaseConnect } from './db/databaseConnect.js'
import cors from 'cors'
import conversationRoutes from './routes/conversation.routes.js'
import messagesRoutes from './routes/messages.routes.js'
import { Server } from 'socket.io'
import { createServer } from 'http'
import { Message } from './models/message.model.js'
import { UnreadCount } from './models/unreadCount.model.js'
// USING ENV FILE!
dotenv.config()

// CREATING EXPRESS APP!
const app = express()
// CREATING HTTP SERVER!
const server = createServer(app)
// CREATING SOCKET WEB SERVER!
const socket = new Server(server, {
  cors: {
    origin: '*'
  }
})

// DATABASE CONNECT!
databaseConnect()

// REQUIRED MIDDLEWARES!
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// USER ROUTES!!
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/conversation', conversationRoutes)
app.use('/api/v1/messages', messagesRoutes)

// ONLINE USERS IDS!
export var onlineUsers = {}

// ON SOCKET CONNECTION!!
socket.on('connection', client => {
  // WHEN USER COMES ACTIVE/ONLINE!
  client.on('update-user-is-online-now', ({ userId, clientId, username }) => {
    onlineUsers[client.id] = userId
    // EMIT AN EVENT ABOUT NEW ACTIVE USERS!!
    socket.emit('update-active-users', {
      onlineUsers,
      clientId: client.id,
      username,
      offline: false
    })
  })

  // UPDATE THE REALTIME MESSAGE SENT/RECEIVED!!
  client.on('message-sent', data => {
    console.log(data)
    socket.emit('message-received', { data, clientId: client.id })
  })

  // UPDATE MESSAGE ON REALTIME!!!
  client.on('message-edited', data => {
    socket.emit('edited-message-received', { data, clientId: client.id })
  })

  // UPDATE SEEN ON REALTIME!
  client.on(
    'message-read-by-user',
    async ({ newMessage, conversationId, userIdToAdd }) => {
      // UPDATE IN DATABASE AS WELL!
      await Message.findByIdAndUpdate(newMessage._id, {
        seenBy: [...newMessage.seenBy, userIdToAdd]
      })

      socket.emit('mark-message-as-read', {
        newMessage,
        conversationId,
        clientId: client.id,
        userIdToAdd
      })
    }
  )

  // UPDATING UNREAD MESSAGES COUNT FOR SPECIFIC CONVERSATION !!
  client.on('update-unread-count-to-0', async ({ conversationId, userId }) => {
    await UnreadCount.findOneAndUpdate(
      { conversationId, userId },
      {
        count: 0
      }
    )
  })

  // MARK ALL UNREAD AS READ!
  client.on('marked-all-unread-as-read', data => {
    socket.emit('update-as-read', { ...data, clientId: client.id })
  })

  // ON USER DISCONNECTED!
  client.on('disconnect', data => {
    console.log('user disconnected')
    // UPDATE THE ONLINE USERS (BY DELETING)!
    delete onlineUsers[client.id]

    socket.emit('update-active-users', {
      onlineUsers,
      clientId: client.id,
      offline: true
    })
  })
})

// RUNNING EXPRESS APP ON PORT: 4444
server.listen(4444, () => {
  console.log('Listening on Port: 4444')
})
