// ALL IMPORTS!
import express from 'express'
import userRoutes from './routes/user.routes.js'

// CREATING EXPRESS APP!
const app = express()

// REQUIRED MIDDLEWARES!
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// USER ROUTES!!
app.use('/api/v1/user', userRoutes)

// RUNNING EXPRESS APP ON PORT: 4444
app.listen(4444, () => {
  console.log('Listening on Port: 4444')
})
