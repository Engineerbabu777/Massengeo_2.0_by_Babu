import React from 'react'
import MineMessage from './components/MineMessage'
import OtherUserMessage from './components/OtherUserMessage'

const SingleMessage = ({ message }) => {
  // GETTING CURRENT ACTIVE USER ID!
  const mine =
    message?.senderId ===
    JSON.parse(localStorage.getItem('userData@**@user'))._id

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
