import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import MiddleSideBar from './components/MiddleSideBar/MiddleSideBar'
import ChatPage from './pages/ChatPage'
import NewChat from './pages/NewChat'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import {Toaster} from 'react-hot-toast'

function App () {
  return (
    <div className='flex '>
      <Toaster />
        <BrowserRouter>
          <Suspense>
            {/* <LeftSideBar /> */}
            {/* <MiddleSideBar /> */}
            <Routes>
              {/* LOGIN PAGE! */}
              <Route path='/' exact Component={NewChat} />
              <Route path='/chat' Component={ChatPage} />
              <Route path='/login' Component={LoginPage} />
              <Route path='/register' Component={RegisterPage} />

            </Routes>
          </Suspense>
        </BrowserRouter>
    </div>
  )
}

export default App
