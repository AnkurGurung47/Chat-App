import { User } from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

//registering user
export const register = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender, email } =
      req.body
    if (!fullName || !username || !password || !confirmPassword || !email) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    if (password != confirmPassword) {
      return res.status(400).json({ message: 'Password did not match' })
    }
    const user = await User.findOne({ username })

    if (user) {
      return res
        .status(400)
        .json({ message: 'username already exist, Try different' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const boyAvatar = `https://api.dicebear.com/7.x/adventurer/svg?seed=${Math.random()}`
    const girlAvatar = `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${Math.random()}`
    await User.create({
      fullName,
      username,
      password: hashedPassword,
      profilePhoto: gender === 'girl' ? girlAvatar : boyAvatar,
      gender,
      email,
    })
    return res.status(201).json({
      message: 'account created successfully',
      success: true,
    })
  } catch (error) {
    console.log(error)
  }
}

//Login

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ message: 'All Fields required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        message: 'User not found',
        success: false,
      })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: 'Password not matched',
        success: false,
      })
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      },
    )
    return res
      .status(200)
      .cookie('token', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'strict',
      })
      .json({
        _id: user._id,
        email: user.email,
        fullname: user.fullName,
        profilePhoto: user.profilePhoto,
      })
  } catch (error) {
    console.log(error)
  }
}

//logout

export const logout = (req, res) => {
  try {
    res
      .status(200)
      .cookie('token', '', { maxAge: 0, httpOnly: true, sameSite: 'strict' })
      .json({ message: 'Logged out successfully' })
  } catch (error) {
    console.log(error)
  }
}

//other User

export const getOtherusers = async (req, res) => {
  try {
    const loggedInUser = req.id
    const otherUsers = await User.find({ _id: { $ne: loggedInUser } }).select(
      '-password',
    )
    return res.status(200).json(otherUsers)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server error' })
  }
}
