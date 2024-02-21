import React from 'react'
import Avatar from '../../../Header/components/Avatar'
import { useSelector } from 'react-redux'
import { formatTimeAgo } from '../../../../../utils/getLastMessageTime'
import { MdDoNotDisturb } from 'react-icons/md'

const OtherUserMessage = ({ message }) => {
  return (
    <section className='flex max-w-[75%] gap-2'>
      {/* AVATAR! */}
      <Avatar src={message?.senderId?.avatar} sm test />
      <div className=''>
        <div
          className={`bg-gray-400 relative rounded-r-xl mr-auto rounded-tl-xl px-8 py-4 text-white text-xl    ${
            message.deleteForEveryOne ? 'italic' : null
          } ${message.messageType === "image-text" ? "bg-transparent border" : ""}`}
        >
          {message?.messageType === 'text' && (
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
          {message?.messageType === 'image' && (
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
           {message?.messageType === 'image-text' && (<>
            {message?.deleteForEveryOne ? (
                <p className='text-gray-800 flex gap-2 items-center'>
                  <MdDoNotDisturb className='h-6 w-6' />
                  this message was deleted{' '}
                </p>
              ) : (<>
                <img className='' src={message?.image} alt={'alt-img-text'} />
                <p className='text-white bg-gray-400 items-center absolute bottom-0 left-0 right-0 p-4'>
                  {message.message}
                </p>           
            </>
              )}
          </>)}
        </div>
        {/* TIME! */}
        <span className='text-gray-400 font-semibold'>
          {message?.senderId?.username} {formatTimeAgo(message?.createdAt)}
        </span>
      </div>
    </section>
  )
}

export default OtherUserMessage
