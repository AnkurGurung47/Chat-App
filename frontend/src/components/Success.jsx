import React from 'react'
import { Link } from 'react-router-dom'

function Success() {
  return (
    <div>
      Hey, you have successfully registered with us , go to
      <Link to="/login" className="text-blue-500 ml-1 hover:underline">
        Login
      </Link>
      Page.
    </div>
  )
}

export default Success
