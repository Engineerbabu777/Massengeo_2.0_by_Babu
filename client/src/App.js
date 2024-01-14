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
//NOTE - THIS COMPONENT WILL CHECK WHETHER USER IS LOGGED OR NOT!
const PrivateRoute = ({ element }) => {
  //REVIEW - CHECKING IF USER IS LOGGED!!
  const userLogged = JSON.parse(localStorage.getItem('userData@**@user'))?.id

  // IF USER IS LOGGED THEN PROCEED!!
  if (userLogged) {
    return (
      <>
        <LeftSideBar />
        <MiddleSideBar />
        {element}
      </>
    )
  } else {
    // Redirect to login if user is not logged in
    return <Navigate to='/login' />
  }
}

function App () {
  return (
    <BrowserRouter>
      <div className='flex'>
        <Toaster />
        <Suspense>
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
