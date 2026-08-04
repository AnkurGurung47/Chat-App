import { Link } from 'react-router-dom'
import React from 'react'

function Welcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome 👋</h1>

        <p className="text-gray-600 mb-8">
          Welcome to our platform! Please log in to continue or create a new
          account if you're new here.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Welcome
