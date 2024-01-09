import { useRef, useState } from 'react'

export default function GroupSidebarDrawer ({ closeModal, open }) {
  return (
    <>
      <div
        onClick={closeModal}
        className={`bg-black/50 fixed left-0 z-[999] right-0 top-0 bottom-0 transition-all duration-500 backdrop-blur-sm ${
          open ? ' visible opacity-1 ' : ' hidden opacity-0 '
        }`}
      />
      <div
        className={`w-[25vw] h-screen bg-[#272829] z-[9999] fixed left-0 top-0 bottom-0 transition duration-500 
        ${open ? '  !text-red-500' : '  translate-x-[-25vw]  '}
        `}
      >
        {/* BODY!! */}
        <p className='text-white text-2xl font-semibold p-2'>
          {/* USERS WILL BE DISPLAYED HERE! */}

          {/* HEADER! */}
          <>
            <nav className='flex mx-3'>
              <h2 className='text-3xl text-white font-bold flex-1 font-sans tracking-wider'>
                Create Group Conversations
              </h2>

              {/* ICONS */}
            </nav>
          </>
        </p>
      </div>
    </>
  )
}
