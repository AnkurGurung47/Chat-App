import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setConversation } from '../redux/userSlice'

function useGetMessages() {
  const dispatch = useDispatch()
  const { selectedUser } = useSelector((store) => store.user)
  useEffect(() => {
    if (!selectedUser?._id) return

    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true
        const res = await axios.get(
          `http://localhost:8080/api/v1/message/${selectedUser?._id}`,
        )
        console.log(res)
        dispatch(setConversation(res.data))
      } catch (error) {}
    }
    fetchMessages()
  }, [selectedUser])
}

export default useGetMessages
