import React from 'react'
import MineMessage from './components/MineMessage'
import OtherUserMessage from './components/OtherUserMessage'

const SingleMessage = ({ message }) => {
  const mine = message?.senderId === 1

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
