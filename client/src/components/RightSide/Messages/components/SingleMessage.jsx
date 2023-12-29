import React from 'react'
import MineMessage from './components/MineMessage'
import OtherUserMessage from './components/OtherUserMessage'
import { findOtherUsers } from '../../../../utils/otherUsers'

const SingleMessage = ({ message }) => {

  // GETTING CURRENT ACTIVE USER ID!
  const mine =
    message?.senderId?._id ===
    JSON.parse(localStorage.getItem('userData@**@user')).id

  console.log({
    mineId: JSON.parse(localStorage.getItem('userData@**@user'))._id,
    messageId: message?.senderId?._id
  })

  return (
    <>
      {mine ? (
        <>
          <MineMessage message={message} />
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
