import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Success from './components/Success'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { setOnlineUsers } from './redux/userSlice'
import { setSocket } from './redux/socketSlice'
import Welcome from './components/Welcome'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/success',
    element: <Success />,
  },
])

function App() {
  const { authUser } = useSelector((store) => store.user)
  // const [socket, setSocket] = useState(null)
  const dispatch = useDispatch()
  // const { socket } = useSelector((store) => store.socket)

  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:8080', {
        query: {
          userId: authUser._id,
        },
      })
      dispatch(setSocket(socket))

      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      })
      return () => {
        socket.close()
      }
    }
  }, [authUser])
  return (
    <div
      className="p-4 h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://t3.ftcdn.net/jpg/03/27/51/56/360_F_327515607_Hcps04aaEc7Ki43d1XZPxwcv0ZaIaorh.jpg')",
      }}
    >
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
