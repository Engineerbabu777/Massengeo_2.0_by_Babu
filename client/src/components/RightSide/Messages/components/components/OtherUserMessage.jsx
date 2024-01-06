import React from 'react'
import Avatar from '../../../Header/components/Avatar'
import { useSelector } from 'react-redux'
import { formatTimeAgo } from '../../../../../utils/getLastMessageTime'

const OtherUserMessage = ({ message }) => {
  const openedChatUsers = useSelector(state => state.chat.openedChatUsers)
  return (
    <section className='flex max-w-[75%] gap-2'>
      {/* AVATAR! */}
      <Avatar src={openedChatUsers?.avatar} sm test />
      <div className=''>
        <div className='bg-gray-400 rounded-r-xl mr-auto rounded-tl-xl px-8 py-4 text-white text-xl '>
          {message.message}
        </div>
        {/* TIME! */}
        <span className='text-gray-400 font-semibold'>
          {openedChatUsers?.username} {formatTimeAgo(message?.createdAt)}
        </span>
      </div>
    </section>
  )
}

export default OtherUserMessage
