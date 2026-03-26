// const express = require('express') method 1
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import userRoutes from './routes/userRoute.js'
import msgRoutes from './routes/msgRoutes.js'
import cookieParser from 'cookie-parser'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
//middleware

app.use(express.json())
app.use(cookieParser())

//routes

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/message', msgRoutes)

// app.listen(PORT, () => {
//   connectDB()
//   console.log(`server is running at ${PORT}`)
// })

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to connect DB:', error.message)
    process.exit(1)
  }
}

startServer()
