import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  avatar: {
    type: String,
    default:
      'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
  }
})

export const User = mongoose.models.user || mongoose.model('user', userSchema)
