import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import MiddleSideBar from './components/MiddleSideBar/MiddleSideBar'
import ChatPage from './pages/ChatPage'
import NewChat from './pages/NewChat'
import LoginPage from './pages/LoginPage';


function App () {
  return (
    <div className='flex '>
        <BrowserRouter>
          <Suspense>
            {/* <LeftSideBar /> */}
            {/* <MiddleSideBar /> */}
            <Routes>
              {/* LOGIN PAGE! */}
              <Route path='/' exact Component={NewChat} />
              <Route path='/chat' Component={ChatPage} />
              <Route path='/login' Component={LoginPage} />
            </Routes>
          </Suspense>
        </BrowserRouter>
    </div>
  )
}

export default App
