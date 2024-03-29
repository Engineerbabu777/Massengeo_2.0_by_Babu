import React from 'react'
import Avatar from '../../../Header/components/Avatar'
import { IoCheckmarkDoneSharp, MdKeyboardArrowDown } from '../../../../../icons'
import { formatTimeAgo } from '../../../../../utils/getLastMessageTime'
import { messageOptions } from '../../../../../utils/messageOptions'
import { useDispatch } from 'react-redux'
import { updateEditMessageId } from '../../../../../redux/chatSlice'
import useMessages from '../../../../../hooks/useMessages'
import { MdDoNotDisturb } from 'react-icons/md'
import { IoCheckmarkSharp } from 'react-icons/io5'
// import { FaUserShield } from 'react-icons/fa6'
import { FaShieldHeart } from 'react-icons/fa6'
import { FaReplyAll } from 'react-icons/fa'
import { GoDotFill } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { findOtherUsers } from '../../../../../utils/otherUsers'

const MineMessage = ({ message, isRead, isAdmin = false }) => {
  // RETRIEVE USER DATA FROM LOCAL STORAGE
  const me = JSON.parse(localStorage.getItem('userData@**@user'))
  const { activeConversationInfo } = useSelector(state => state.chat)
  const dispatch = useDispatch()
  // HANDLE MENU!!
  const [showMenu, setShowMenu] = React.useState(false)
  const { deleteMessage } = useMessages()

  const handleMenuSelect = (opt, m) => {
    setShowMenu(false)
    if (opt === 'edit') {
      messageOptions(opt, m, dispatch)
      dispatch(updateEditMessageId(m._id))
    } else {
      deleteMessage(opt, m?._id)
    }
  }

  return (
    // SECTION CONTAINING THE MESSAGE AND AVATAR, ALIGNED TO THE RIGHT
    <section className='flex ml-auto max-w-[75%] gap-2 group'>
      {/* DISPLAY MENU!(WILL MOVE TO ANOTHER FILE LATER!) */}
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
          className={`${
            message?.messageType === 'image'
              ? 'bg-transparent border-2 border-white'
              : message?.messageType === 'text'
              ? 'bg-[#F05454]'
              : 'bg-transparent border-2 border-white !p-2'
          } rounded-l-xl  rounded-tr-xl px-8 py-4 text-white text-xl cursor-pointer relative overflow-hidden ${
            message?.deleteForMe || message.deleteForEveryOne ? 'italic' : null
          }`}
          onClick={() => {
            if (!message?.deleteForMe && !message?.deleteForEveryOne) {
              setShowMenu(!showMenu)
            }
          }}
        >
          {/* DISPLAY THE MESSAGE TEXT */}
          {message?.messageType === 'text' && !message.isStoryReply && (
            <>
              {message?.deleteForMe || message?.deleteForEveryOne ? (
                <p className='text-gray-800 flex gap-2 items-center'>
                  <MdDoNotDisturb className='h-6 w-6' />
                  you deleted this message{' '}
                </p>
              ) : (
                message.message
              )}
            </>
          )}
          {/* FOR DISPLAYING IMAGES! */}
          {message?.messageType === 'image' && !message.isStoryReply && (
            <>
              {message?.deleteForMe || message?.deleteForEveryOne ? (
                <p className='text-gray-800 flex gap-2 items-center'>
                  <MdDoNotDisturb className='h-6 w-6' />
                  you deleted this message{' '}
                </p>
              ) : (
                <img className='' src={message?.image} alt={'alt-img-text'} />
              )}
            </>
          )}
          {/* FOR DISPLAYING IMAGE AND TEXT TOGETHER! */}
          {message?.messageType === 'image-text' && (
            <>
              {message?.deleteForMe || message?.deleteForEveryOne ? (
                <p className='text-gray-800 flex gap-2 items-center'>
                  <MdDoNotDisturb className='h-6 w-6' />
                  you deleted this message{' '}
                </p>
              ) : (
                <>
                  <img className='' src={message?.image} alt={'alt-img-text'} />
                  <p className='text-white bg-[#F05454] items-center absolute bottom-0 left-0 right-0 p-4'>
                    {message.message}
                  </p>
                </>
              )}
            </>
          )}

          {/* SHOW DELETED REPLY FOR STATUS! */}
          {(message?.deleteForMe || message?.deleteForEveryOne) && (
            <p className='text-gray-800 flex gap-2 items-center'>
              <MdDoNotDisturb className='h-6 w-6' />
              you deleted this message {' '}
            </p>
          )}

          {/* FOR DISPLAYING TEXT REPLIES ON STORIES! */}
          {message?.messageType === 'text' && message.isStoryReply && (!message?.deleteForMe && !message?.deleteForEveryOne) && (
            <>
              <>
                {message?.storyId?.storyType === 'image' && (
                  <div className='flex-1 flex w-full h-[100px] flex-row border-l-4 border-blue-200 gap-2 mb-14'>
                    <div className='flex gap-6 flex-col h-[100px] p-2 '>
                      <p className='flex items-center gap-2 text-purple-700 font-semibold'>
                        <FaReplyAll className='w-4 h-4' />
                        {message.storyId.userId.username}{' '}
                        <GoDotFill className=' w-2 h-2' /> Status
                      </p>
                      <p className=' text-gray-600 w-[400px] truncate'>
                        {message?.storyId?.storyText ||
                          'diummeyguh hsduhg ajhsbghb jahsbh jhsadbv'}
                      </p>
                    </div>
                    <img
                      data-twe-lazy-load-init
                      src={message?.storyId?.statusImage}
                      className='w-[150px] h-[100px] rounded-md overflow-hidden'
                      alt='text'
                    />
                  </div>
                )}
                <p className='text-white bg-[#DC4242] items-center absolute bottom-0 left-0 right-0 p-4 pl-8'>
                  {message.message}
                </p>
              </>
            </>
          )}

          {message?.messageType === 'text' && message.isStoryReply && (!message?.deleteForMe && !message?.deleteForEveryOne) && (
            <>
              <>
                {message?.storyId?.storyType === 'text' && (
                  <div className='flex-1 flex w-full h-[100px] flex-row border-l-4 border-blue-200 gap-2 mb-14'>
                    <div className='flex gap-6 flex-col h-[100px] p-2 '>
                      <p className='flex items-center gap-2 text-purple-700 font-semibold'>
                        <FaReplyAll className='w-4 h-4' />
                        {message.storyId.userId.username}{' '}
                        <GoDotFill className=' w-2 h-2' /> Status
                      </p>
                      <p className=' text-gray-600 w-[400px] truncate'>
                        {message?.storyId?.storyText ||
                          'diummeyguh hsduhg ajhsbghb jahsbh jhsadbv'}
                      </p>
                    </div>
                  </div>
                )}
                <p className='text-white bg-[#DC4242] items-center absolute bottom-0 left-0 right-0 p-4 pl-8'>
                  {message.message}
                </p>
              </>
            </>
          )}
        </div>

        {/* TIME AND READ STATUS OF THE MESSAGE */}
        {/* TIME AND READ STATUS DISPLAYED AT THE BOTTOM RIGHT OF THE MESSAGE */}
        <span className='text-gray-400 font-semibold text-right flex gap-1 justify-end'>
          {/* DISPLAY SENDER'S USERNAME AND TIME SINCE THE MESSAGE WAS CREATED */}
          {isAdmin && (
            <FaShieldHeart
              className={`text-blue-600 w-3 h-3 ${
                isAdmin ? 'inline-flex mr-1' : 'hidden'
              }`}
            />
          )}
          {me?.username} {formatTimeAgo(message?.createdAt)}
          {/* CHECKMARK ICON INDICATING WHETHER THE MESSAGE HAS BEEN READ */}
          {/* DOUBLE TICK FOR MESSAGE DELIVERY AS WELL SEEN OR NOT SEEN! */}
          <IoCheckmarkDoneSharp
            className={`${message.isGroupMessage ? 'hidden' : ''} ${
              message?.deleteForMe || message?.deleteForEveryOne ? 'hidden' : ''
            } ${
              message?.delivered
                ? isRead
                  ? 'text-green-500'
                  : 'text-gray-300'
                : 'hidden'
            } w-6 h-6`}
          />
          {/* SINGLE TICK FOR NET DELIVERY OF MESSAGE! */}
          <IoCheckmarkSharp
            className={`
          ${message.isGroupMessage ? 'hidden' : ''} ${
              message?.deleteForMe || message?.deleteForEveryOne ? 'hidden' : ''
            } ${
              message?.delivered
                ? isRead
                  ? 'hidden'
                  : 'hidden'
                : 'text-gray-300'
            } w-6 h-6
          `}
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
