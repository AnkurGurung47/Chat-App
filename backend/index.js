// const express = require('express') method 1
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/database.js'
import userRoutes from './routes/userRoute.js'
import msgRoutes from './routes/msgRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { app, server } from './socket/socket.js'
import path from 'path'

dotenv.config()

// const app = express()

const _dirname = path.resolve()

const PORT = process.env.PORT || 5000

//cors
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
)

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//routes

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/message', msgRoutes)

app.use(express.static(path.join(_dirname, '/frontend/build')))

app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'))
})

// app.listen(PORT, () => {
//   connectDB()
//   console.log(`server is running at ${PORT}`)
// })

const startServer = async () => {
  try {
    await connectDB()
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Failed to connect DB:', error.message)
    process.exit(1)
  }
}

startServer()
