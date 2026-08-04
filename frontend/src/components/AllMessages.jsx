import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'

function AllMessages() {
  useGetMessages()
  const { conversation } = useSelector((store) => store.user)
  if (!conversation) return
  return (
    <div className="px-4 flex-1 overflow-auto">
      {conversation &&
        conversation?.map((msg) => {
          return <Message key={msg._id} msg={msg} />
        })}
    </div>
    // {allUsers?.map((user) => {
    //     return <User key={user._id} user={user} />
    //   })}
  )
}

export default AllMessages
