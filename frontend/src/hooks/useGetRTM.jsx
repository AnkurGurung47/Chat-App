import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setConversation } from '../redux/userSlice'

//REAL-TIME-MESSAGE
function useGetRTM() {
  const { socket } = useSelector((store) => store.socket)
  const { conversation } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  useEffect(() => {
    socket?.on('newMessage', (newMessage) => {
      dispatch(setConversation([...conversation, newMessage]))
    })
  }, [socket, setConversation, conversation])
}

export default useGetRTM
