// import mongoose from 'mongoose'
// const connectDB = async () => {
//   await mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => {
//       console.log('DB Connected')
//     })
//     .catch((error) => {
//       console.log('Error occured while conncetd DB')
//     })
// }

// export default connectDB

import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`🗄️ MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

export default connectDB
