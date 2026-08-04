import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setAuthUser } from '../redux/userSlice'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post(
        'http://localhost:8080/api/v1/user/login',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      )
      if (res.status === 200) {
        navigate('/home')
      }

      dispatch(setAuthUser(res.data))
    } catch (error) {
      console.log(error.response?.data)
      toast.error(error.response?.data?.message)
      setUser((prev) => ({
        ...prev,
        password: '',
      }))
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
          Welcome Back! <br />
        </h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="label p-2">
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

          <div>
            <label htmlFor="password" className="label p-2">
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

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg transition ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
          <div className="pt-3 text-center text-sm">
            Don't have an account?
            <Link to="/register" className="text-blue-500 ml-1 hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
