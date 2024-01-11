import React from 'react'
import Avatar from '../../../Header/components/Avatar'
import { IoCheckmarkDoneSharp, MdKeyboardArrowDown } from '../../../../../icons'
import { formatTimeAgo } from '../../../../../utils/getLastMessageTime'
import { messageOptions } from '../../../../../utils/messageOptions'
import { useDispatch } from 'react-redux'

const MineMessage = ({ message, isRead }) => {
  // RETRIEVE USER DATA FROM LOCAL STORAGE
  const me = JSON.parse(localStorage.getItem('userData@**@user'))
  const dispatch = useDispatch()
  // HANDLE MENU!!
  const [showMenu, setShowMenu] = React.useState(false)

  const handleMenuSelect = (opt, m) => {
    messageOptions(opt, m, dispatch)
    setShowMenu(false);
  }

  return (
    // SECTION CONTAINING THE MESSAGE AND AVATAR, ALIGNED TO THE RIGHT
    <section className='flex ml-auto max-w-[75%] gap-2 group'>
      {/* DISPLAY MENU! */}
      {showMenu && (
        <div className='bg-black border-2 border-white rounded-md absolute  z-[9999] flex flex-col gap-2 right-[10%] '>
          <p className='text-center font-bold text-white mt-2'>Message Info</p>
          <p
            className='text-md text-gray-500 font-semibold hover:text-gray-300 border-b-2 border-white cursor-pointer px-4 py-2'
            onClick={() => {
              handleMenuSelect('edit', message)
            }}
          >
            Edit
          </p>
          <p
            className='text-md text-gray-500 font-semibold hover:text-gray-300 border-b-2 border-white cursor-pointer px-4 py-2'
            onClick={() => {
              handleMenuSelect('delete_me', message)
            }}
          >
            Delete For Me
          </p>
          <p
            className='text-md text-gray-500 font-semibold hover:text-gray-300 border-b-2 border-white cursor-pointer px-4 py-2'
            onClick={() => {
              handleMenuSelect('delete_everyone', message)
            }}
          >
            Delete For Everyone
          </p>
        </div>
      )}
      {/* CONTAINER FOR THE MESSAGE TEXT */}
      <div className='w-full flex flex-col'>
        {/* MESSAGE BUBBLE WITH BACKGROUND COLOR, ROUNDED CORNERS, AND STYLING */}
        <div
          className='bg-[#F05454] rounded-l-xl  rounded-tr-xl px-8 py-4 text-white text-xl cursor-pointer'
          onClick={() => setShowMenu(!showMenu)}
        >
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
