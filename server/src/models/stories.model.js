import mongoose from 'mongoose'

const storySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  storyText: String,
  backgroundColor: String,
  fontFamily: String,
  textColor: String,
  storyType: String,
  statusImage: String
})

export const Story = mongoose.model('story', storySchema)
