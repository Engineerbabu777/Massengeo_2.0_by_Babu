import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String
})

export const User = mongoose.models.user || mongoose.model('user', userSchema)
