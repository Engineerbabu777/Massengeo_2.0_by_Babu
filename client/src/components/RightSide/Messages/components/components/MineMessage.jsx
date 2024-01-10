import React from 'react'
import Avatar from '../../../Header/components/Avatar'
import { IoCheckmarkDoneSharp } from '../../../../../icons'
import { formatTimeAgo } from '../../../../../utils/getLastMessageTime'

const MineMessage = ({ message, isRead }) => {
  // RETRIEVE USER DATA FROM LOCAL STORAGE
  const me = JSON.parse(localStorage.getItem('userData@**@user'))

  return (
    // SECTION CONTAINING THE MESSAGE AND AVATAR, ALIGNED TO THE RIGHT
    <section className='flex ml-auto max-w-[75%] gap-2'>
      {/* CONTAINER FOR THE MESSAGE TEXT */}
      <div className='w-full flex flex-col'>
        {/* MESSAGE BUBBLE WITH BACKGROUND COLOR, ROUNDED CORNERS, AND STYLING */}
        <div className='bg-[#F05454] rounded-l-xl  rounded-tr-xl px-8 py-4 text-white text-xl '>
          {/* DISPLAY THE MESSAGE TEXT */}
          {message.message}
        </div>

        {/* TIME AND READ STATUS OF THE MESSAGE */}
        {/* TIME AND READ STATUS DISPLAYED AT THE BOTTOM RIGHT OF THE MESSAGE */}
        <span className='text-gray-400 font-semibold text-right flex gap-1 justify-end'>
          {/* DISPLAY SENDER'S USERNAME AND TIME SINCE THE MESSAGE WAS CREATED */}
          {me?.username} {formatTimeAgo(message?.createdAt)}
          {/* CHECKMARK ICON INDICATING WHETHER THE MESSAGE HAS BEEN READ */}
          <IoCheckmarkDoneSharp
            className={`${message.isGroupMessage ? 'hidden' : ''} ${
              message?.delivered
                ? isRead
                  ? 'text-green-500'
                  : 'text-blue-500'
                : 'text-red-400'
            } w-6 h-6`}
          />
        </span>
      </div>

      {/* CONTAINER FOR THE USER'S AVATAR */}
      <div className='w-16 h-16 rounded-full '>
        {/* DISPLAY THE USER'S AVATAR */}
        <Avatar src={me?.image} sm />
      </div>
    </section>
  )
}

export default MineMessage
