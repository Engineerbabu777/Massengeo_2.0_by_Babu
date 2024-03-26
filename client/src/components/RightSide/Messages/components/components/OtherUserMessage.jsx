import React from 'react'
import Avatar from '../../../Header/components/Avatar'
import { useSelector } from 'react-redux'
import { formatTimeAgo } from '../../../../../utils/getLastMessageTime'
import { MdDoNotDisturb } from 'react-icons/md'
import { FaReplyAll, FaShieldHeart } from 'react-icons/fa6'
import { GoDotFill } from 'react-icons/go'

const OtherUserMessage = ({ message, isAdmin = false }) => {
  return (
    <section className='flex max-w-[75%] gap-2'>
      {/* AVATAR! */}
      <Avatar src={message?.senderId?.avatar} sm test isAdmin={isAdmin} />
      <div className=''>
        <div
          className={`bg-gray-400 relative rounded-r-xl mr-auto rounded-tl-xl px-8 py-4 text-white text-xl    ${
            message.deleteForEveryOne ? 'italic' : null
          } ${
            message.messageType === 'image-text' ? 'bg-transparent border' : ''
          }`}
        >
          {message?.messageType === 'text' && !message.isStoryReply && (
            <>
              {message?.deleteForEveryOne ? (
                <p className='text-gray-800 flex gap-2 items-center'>
                  <MdDoNotDisturb className='h-6 w-6' />
                  this message was deleted{' '}
                </p>
              ) : (
                message?.message
              )}
            </>
          )}

          {/* FOR DISPLAYING IMAGES! */}
          {message?.messageType === 'image' && !message.isStoryReply && (
            <>
              {message?.deleteForEveryOne ? (
                <p className='text-gray-800 flex gap-2 items-center'>
                  <MdDoNotDisturb className='h-6 w-6' />
                  this message was deleted{' '}
                </p>
              ) : (
                <img className='' src={message?.image} alt={'alt-img-text'} />
              )}
            </>
          )}

          {/* FOR DISPLAYING IMAGE REPLIES STATUS! */}
          {message?.messageType === 'text' && message.isStoryReply && (
            <>
              {message?.deleteForEveryOne ? (
                <p className='text-gray-800 flex gap-2 items-center'>
                  <MdDoNotDisturb className='h-6 w-6' />
                  this message was deleted{' '}
                </p>
              ) : (
                <>
                  {message?.storyId?.storyType === 'image' && (
                    <div className='flex-1 flex w-full h-[100px] flex-row border-l-4 border-blue-200 gap-2 mb-14'>
                      <div className='flex gap-6 flex-col h-[100px] p-2 '>
                        <p className='flex items-center gap-2 text-purple-700 font-semibold'>
                          <FaReplyAll className='w-4 h-4' />
                          Engineer Babu <GoDotFill className=' w-2 h-2' />{' '}
                          Status
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
                  <p className='text-white bg-gray-500 items-center absolute bottom-0 left-0 right-0 p-4 pl-8'>
                    {message.message}
                  </p>
                </>
              )}
            </>
          )}

          {/* FOR REPLYING TO TEXTS! */}
          {message?.messageType === 'text' && message.isStoryReply && (
            <>
              {message?.deleteForEveryOne ? (
                <p className='text-gray-800 flex gap-2 items-center'>
                  <MdDoNotDisturb className='h-6 w-6' />
                  this message was deleted{' '}
                </p>
              ) : (
                <>
                  {message?.storyId?.storyType === 'text' && (
                    <div className='flex-1 flex w-full h-[100px] flex-row border-l-4 border-blue-200 gap-2 mb-14'>
                      <div className='flex gap-6 flex-col h-[100px] p-2 '>
                        <p className='flex items-center gap-2 text-purple-700 font-semibold'>
                          <FaReplyAll className='w-4 h-4' />
                          Engineer Babu <GoDotFill className=' w-2 h-2' />{' '}
                          Status
                        </p>
                        <p className=' text-gray-600 w-[400px] truncate'>
                          {message?.storyId?.storyText ||
                            'diummeyguh hsduhg ajhsbghb jahsbh jhsadbv'}
                        </p>
                      </div>
                    </div>
                  )}
                  <p className='text-white bg-gray-500 items-center absolute bottom-0 left-0 right-0 p-4 pl-8'>
                    {message.message}
                  </p>
                </>
              )}
            </>
          )}

          {message?.messageType === 'image-text' && (
            <>
              {message?.deleteForEveryOne ? (
                <p className='text-gray-800 flex gap-2 items-center'>
                  <MdDoNotDisturb className='h-6 w-6' />
                  this message was deleted{' '}
                </p>
              ) : (
                <>
                  <img className='' src={message?.image} alt={'alt-img-text'} />
                  <p className='text-white bg-gray-400 items-center absolute bottom-0 left-0 right-0 p-4'>
                    {message.message}
                  </p>
                </>
              )}
            </>
          )}
        </div>
        {/* TIME! */}
        <span className='text-gray-400 font-semibold flex items-center'>
          {isAdmin && (
            <FaShieldHeart
              className={`text-blue-600 w-3 h-3 ${
                isAdmin ? 'inline-flex mr-1' : 'hidden'
              }`}
            />
          )}
          {message?.senderId?.username} {formatTimeAgo(message?.createdAt)}
        </span>
      </div>
    </section>
  )
}

export default OtherUserMessage
