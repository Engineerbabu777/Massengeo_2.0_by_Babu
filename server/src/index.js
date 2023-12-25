// ALL IMPORTS!
import express from 'express'
import userRoutes from './routes/user.routes.js'
import * as dotenv from 'dotenv'
import { databaseConnect } from './db/databaseConnect.js';

// USING ENV FILE!
dotenv.config();

// CREATING EXPRESS APP!
const app = express()

// DATABASE CONNECT!
databaseConnect();

// REQUIRED MIDDLEWARES!
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// USER ROUTES!!
app.use('/api/v1/user', userRoutes)

// RUNNING EXPRESS APP ON PORT: 4444
app.listen(4444, () => {
  console.log('Listening on Port: 4444')
})
