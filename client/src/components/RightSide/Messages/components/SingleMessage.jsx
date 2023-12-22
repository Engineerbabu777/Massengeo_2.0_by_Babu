import React from 'react'

const SingleMessage = ({ message }) => {
  const mine = message.senderId === 1 ? true : false

  return <>{mine ? <></> : <></>}</>
}

export default SingleMessage
