import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAllUsers } from '../redux/userSlice'

function useGetOtherUsers() {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true

        const res = await axios.get(
          'https://chat-app-vmx9.onrender.com/api/v1/user/',
        )

        //store
        dispatch(setAllUsers(res.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchOtherUsers()
  }, [])
}

export default useGetOtherUsers
