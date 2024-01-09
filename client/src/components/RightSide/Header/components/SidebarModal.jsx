import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

export default function SidebarModal ({ closeModal, open }) {
  const user = useSelector(state => state.chat.openedChatUsers)

  return (
    <>
      <div
        onClick={closeModal}
        className={`bg-black/50 fixed left-0 z-[999] right-0 top-0 bottom-0 transition-all duration-500 backdrop-blur-sm ${
          open ? ' visible opacity-1 ' : ' hidden opacity-0 '
        }`}
      />
      <div
        className={`w-[25vw] h-screen bg-[#272829] z-[9999] fixed right-0 transition duration-500 
        ${open ? '  !text-red-500' : '  translate-x-[25vw]  '}
        `}
      >
        {/* BODY!! */}
        <p className='text-white text-2xl font-semibold p-2'>
          User Information Here!
        </p>
      </div>
    </>
  )
}
