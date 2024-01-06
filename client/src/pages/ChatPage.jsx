import React, { useEffect, useState } from 'react'
import Header from '../components/RightSide/Header/Header'
import SidebarModal from '../components/RightSide/Header/components/SidebarModal'
import Messages, { socket } from '../components/RightSide/Messages/Messages'
import Footer from '../components/RightSide/Footer/Footer'

function ChatPage () {
  const [open, setOpen] = useState(false)
  // CREATING CLIENT SIDE SOCKET CONNECTION!

  return (
    <div className='bg-[#0c0415] h-screen flex-1 flex flex-col'>
      {/* SIDEBAR!!(FIXED) */}
      <SidebarModal closeModal={() => setOpen(!open)} open={open} />

      {/* HEADER! */}
      <Header openSideModal={() => setOpen(true)} />

      {/* MESSAGES */}
      <Messages />

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default ChatPage
