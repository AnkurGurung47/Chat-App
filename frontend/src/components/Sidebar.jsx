import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import AllUser from './AllUser'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import store from '../redux/store'
import { setAllUsers, setAuthUser, setSelectedUser } from '../redux/userSlice'

function Sidebar() {
  const [searchText, setSearchText] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { allUsers } = useSelector((store) => store.user)

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        'https://chat-app-vmx9.onrender.com/api/v1/user/logout',
      )
      navigate('/login')
      dispatch(setAuthUser(null))
      dispatch(setSelectedUser(null))
      toast.success(res.data.message)
    } catch (error) {
      console.log(error)
    }
  }

  const filteredUsers = allUsers?.filter((user) =>
    user.fullName.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form action="" className="flex items-center">
        <input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          type="text"
          className="input input-bordered rounded-l-full rounded-r-none"
          placeholder="Search..."
        />
        <button
          type="submit"
          className="btn rounded-r-full rounded-l-none border-l-0"
        >
          <FaSearch size={28} />
        </button>
      </form>
      <div className="divider"></div>
      <AllUser users={filteredUsers} />
      <div className="mt-auto">
        <button onClick={logoutHandler} className="btn btn-sm">
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar
