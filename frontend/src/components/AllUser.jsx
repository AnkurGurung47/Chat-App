import React from 'react'
import User from './User'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'
import store from '../redux/store'
import { all } from 'axios'
function AllUser({ users }) {
  useGetOtherUsers()
  const { allUsers } = useSelector((store) => store.user)
  if (!allUsers) return

  return (
    <>
      {users?.length === 0 ? (
        <p className="text-center text-gray-400 mt-4">User not found</p>
      ) : (
        <div className="px-4 flex-1 overflow-auto">
          {users?.map((user) => {
            return <User key={user._id} user={user} />
          })}
        </div>
      )}
    </>
  )
}

export default AllUser
