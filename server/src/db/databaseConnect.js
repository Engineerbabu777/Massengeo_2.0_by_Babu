import mongoose from 'mongoose'

export const databaseConnect = async () => {
  if (mongoose.connections.readyState === 1) {
    return mongoose.connection.asPromise()
  } else {
    return mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('Database Connected'))
  }
}
