import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

function Register() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [user, setUser] = useState({
    email: '',
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
  })
  const handleChange = async (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (user.password !== user.confirmPassword) {
      return toast.error('Passwords do not match')
    }

    try {
      const res = await axios.post(
        'https://chat-app-vmx9.onrender.com/api/v1/user/register',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 201) {
        navigate('/success')
        toast.success('Account created successfully')
      }
    } catch (error) {
      console.log(error.response?.data)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-w-96 mx-auto">
      <div
        className="p-6
        h-full w-full bg-blue-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100"
      >
        <h1 className="text-3xl font-bold text-center text-gray-600">
          Register
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label for="email" className="label p-2">
              <span className=" text-base label-text">Email Address</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div id="name">
            <label htmlFor="" className="label p-2">
              <span className=" text-base label-text">Name</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Full name"
              name="fullName"
              id="fullname"
              required
              value={user.fullName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="" className="label p-2">
              <span className=" text-base label-text">Username</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              placeholder="Username"
              name="username"
              id="username"
              required
              value={user.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="" className="label p-2">
              <span className=" text-base label-text">Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              placeholder="Password"
              name="password"
              id="password"
              required
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="" className="label p-2">
              <span className=" text-base label-text">Confirm password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              placeholder="Confirm password"
              name="confirmPassword"
              id="confirmPassword"
              required
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="pt-6">
            <button
              disabled={loading}
              type="submit"
              className={`w-full py-2 rounded-lg transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
          <div className="pt-3 text-center text-sm">
            Already have an account?
            <Link to="/login" className="text-blue-500 ml-1 hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
