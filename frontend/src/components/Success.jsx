import React from 'react'
import { Link } from 'react-router-dom'

function Success() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-xl rounded-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">
          🎉 Registration Successful!
        </h1>

        <p className="text-xl text-gray-700">
          You have successfully registered with us.
        </p>

        <Link
          to="/login"
          className="inline-block mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition"
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}

export default Success
