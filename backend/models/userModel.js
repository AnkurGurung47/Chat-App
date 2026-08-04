import mongoose from 'mongoose'

const userModel = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String,
    default: '',
  },
  gender: {
    type: String,
    default: 'not specified',
    enum: ['male', 'female', 'not specified'],
  },
})
export const User = mongoose.model('User', userModel)
