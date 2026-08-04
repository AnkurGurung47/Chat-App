import React, { useEffect } from 'react'
import SendInput from './SendInput'
// import Message from './Message'
import AllMessages from './AllMessages'
import { useDispatch, useSelector } from 'react-redux'
import store from '../redux/store'
import { setSelectedUser } from '../redux/userSlice'

function MessageContainer() {
  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user,
  )
  const isOnline = onlineUsers?.includes(selectedUser?._id)

  const dispatch = useDispatch()
  // useEffect(() => {
  //   return () => {
  //     dispatch(setSelectedUser(null))
  //   }
  // }, [])
  return (
    <>
      {selectedUser != null ? (
        <div className=" w-80 md:min-w-[550px] flex flex-col bg-white">
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2">
            <div className={`avatar ${isOnline ? 'online' : ''}`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="" />
              </div>
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <AllMessages />
          </div>

          <SendInput />
        </div>
      ) : (
        <div className="px-4 flex-1 flex justify-center items-center w-80">
          <p>Let's Start New Conversation</p>
        </div>
      )}
    </>
  )
}

export default MessageContainer
