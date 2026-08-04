import React, { useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { setConversation } from '../redux/userSlice'
// import useGetMessages from '../hooks/useGetMessages'
import useGetRTM from '../hooks/useGetRTM'
// import { Conversation } from '../../../backend/models/convoModel'

function SendInput() {
  useGetRTM()
  const [text, setText] = useState('')
  const dispatch = useDispatch()
  const { selectedUser } = useSelector((store) => store.user)
  const { conversation } = useSelector((store) => store.user)
  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/message/send/${selectedUser?._id}`,
        { message: text },
        { withCredentials: true },
      )
      dispatch(setConversation([...conversation, res.data.message]))
      setText('')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={onSubmitHandler} action="" className="px-4 my-3">
      <div className="w-full relative flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Send a message..."
          className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white"
        />
        <button
          type="submit"
          className="absolute flex inset-y-0 end-0 items-center pr-4"
        >
          <IoSend className="size-6" />
        </button>
      </div>
    </form>
  )
}

export default SendInput
