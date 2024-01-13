import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { findOtherUsers } from '../../../../utils/otherUsers'
import Avatar from './Avatar'
import SingleUserInfo from './SingleUserInfo'
import GroupInfo from './GroupInfo'

export default function SidebarModal ({ closeModal, open }) {
  const activeChat = useSelector(state => state.chat.activeConversationInfo)

  const isGroupChat = activeChat?.group

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
        <section className='text-white text-2xl font-semibold h-screen overflow-auto no-scrollbar pb-6 '>
          {/* WILL ONLY SHOW IF THE CONVERSATION IS OF TYPE ONE TO ONE CHAT! */}
          {!isGroupChat && (
            <SingleUserInfo activeChat={activeChat} isGroupChat={isGroupChat} />
          )}

          {/* WILL ONLY SHOW IF THE CONVERSATION IS OF TYPE MANY TO MANY CHAT!! */}
          {isGroupChat && (
            <GroupInfo activeChat={activeChat} />
          )}
        </section>
      </div>
    </>
  )
}
