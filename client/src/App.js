import React, { Suspense, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import MiddleSideBar from './components/MiddleSideBar/MiddleSideBar'
import ChatPage from './pages/ChatPage'
import NewChat from './pages/NewChat'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { Toaster } from 'react-hot-toast'
import { socket } from './components/RightSide/Messages/Messages'
import { useSelector } from 'react-redux'
import SettingsPage from './pages/SettingsPage'
import NotificationsPage from './pages/NotificationsPage'
import FriendsPage from './pages/FriendsPage'
import useUser from './hooks/useUser'

//NOTE - THIS COMPONENT WILL CHECK WHETHER USER IS LOGGED OR NOT!
const PrivateRoute = ({ element }) => {
  //REVIEW - CHECKING IF TOKEN IS AVAILABLE!!
  const isTokenAvailable = localStorage.getItem('token') ? true : false

  const { currentUser, loadingCurrentUser } = useSelector(state => state.user)
  const { fetchCurrentUserData } = useUser()


  // FETCH CURRENT USER DATA!
  useEffect(() => {
    fetchCurrentUserData();
  }, [])

  if (loadingCurrentUser && isTokenAvailable) {
    return <div className="flex items-center justify-center text-3xl text-[#F05454] bg-[#123] h-screen w-screen">Loading Information</div>
  }

  // IF USER IS LOGGED THEN PROCEED!!
  if (isTokenAvailable && currentUser?.email) {
    return (
      <>
        <LeftSideBar />
        <MiddleSideBar />
        {element}
      </>
    )
  }

  // THAT MEANS USER IS NOT LOGGED IN!
  if (!isTokenAvailable && !loadingCurrentUser && !currentUser?.email) {
    return <Navigate to='/login' />
  }
}

function App () {
  return (
    <BrowserRouter>
      <div className='flex'>
        <Toaster />
        <Suspense fallback={"loading all data..."}>
          <Routes>
            {/* PROTECTED PAGES! */}
            <Route path='/' element={<PrivateRoute element={<NewChat />} />} />
            {/* CONVERSATION PAGE! */}
            <Route
              path='/:conversationId'
              element={<PrivateRoute element={<ChatPage />} />}
            />
            {/* SETTINGS PAGE! */}
            <Route
              path='/settings'
              element={<PrivateRoute element={<SettingsPage />} />}
            />
            {/* NOTIFICATIONS PAGE! */}
            <Route
              path='/notifications'
              element={<PrivateRoute element={<NotificationsPage />} />}
            />
            {/* FRIENDS PAGE! */}
            <Route
              path='/friends'
              element={<PrivateRoute element={<FriendsPage />} />}
            />

            {/* AUTH PAGES! (ACCESS_ABLE FOR EVERYONE) */}
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App
