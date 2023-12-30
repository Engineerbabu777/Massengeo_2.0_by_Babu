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

// ON SOCKET CONNECTION!!
socket.on('connection', client => {
  console.log('Client Connected!')

  client.on('message-sent', message => {
    console.log(message)
    socket.emit('message-received', {message,clientId:client.id})
  })
  // ON USER DISCONNECTED!
  client.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// RUNNING EXPRESS APP ON PORT: 4444
server.listen(4444, () => {
  console.log('Listening on Port: 4444')
})
