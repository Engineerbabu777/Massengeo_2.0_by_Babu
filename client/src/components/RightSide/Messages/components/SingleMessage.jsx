import React from 'react'
import MineMessage from './components/MineMessage'
import OtherUserMessage from './components/OtherUserMessage'
import { findOtherUsers } from '../../../../utils/otherUsers'
import { isMessageReadByOrNot } from '../../../../utils/getIsMessageReadOrNot'

const SingleMessage = ({ message }) => {

  // GETTING CURRENT ACTIVE USER ID!
  const mine =
    message?.senderId?._id ===
    JSON.parse(localStorage.getItem('userData@**@user')).id

  // IS MESSAGE READ BY OTHER!
  const isRead = isMessageReadByOrNot(message?.seenBy, )

  

  return (
    <>
      {mine ? (
        <>
          <MineMessage message={message} isRead={isRead}/>
        </>
      ) : (
        <>
          <OtherUserMessage message={message} />
        </>
      )}
    </>
  )
}

export default SingleMessage
