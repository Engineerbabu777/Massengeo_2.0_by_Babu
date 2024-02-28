import React from 'react'
import MineMessage from './components/MineMessage'
import OtherUserMessage from './components/OtherUserMessage'
import { findOtherUsers } from '../../../../utils/otherUsers'
import { isMessageReadByOrNot } from '../../../../utils/getIsMessageReadOrNot'
import { userDetails } from '../../../../utils/getUserDetails'

const SingleMessage = ({ message }) => {
  // GETTING CURRENT ACTIVE USER ID!
  const mine =
    message?.senderId?._id ===
    JSON.parse(localStorage.getItem('userData@**@user')).id

  // IS MESSAGE READ BY OTHER!
  const isRead = isMessageReadByOrNot(message?.seenBy)

  return (
    <>
      {message?.isLeaveOrRemoval ? (
        <>
          <div className='flex items-center justify-center text-white'>
            <p className="bg-gray-600 text-center rounded-md p-2">
              {/* IF THIS IS NOT ME! */}
            {message.leaveOrRemovalData.userId._id !== userDetails.id && message.leaveOrRemovalData.userId.username.toUpperCase() + " has been " + message?.message}
            {/* IF THIS IS ME! */}
            {message.leaveOrRemovalData.userId._id === userDetails.id && " You are no longer member of the conversation😢!"}
            </p>
          </div>
        </>
      ) : (
        <>
          {mine ? (
            <>
              <MineMessage message={message} isRead={isRead} />
            </>
          ) : (
            <>
              <OtherUserMessage message={message} />
            </>
          )}
        </>
      )}
    </>
  )
}

export default SingleMessage
