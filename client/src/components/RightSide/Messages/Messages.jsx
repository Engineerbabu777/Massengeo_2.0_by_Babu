import React from 'react'
import { marsConversation } from '../../../constants'
import SingleMessage from './components/SingleMessage'

const Messages = () => {
  return (
    <div className='flex-1'>
      {marsConversation.map((message, ind) => (
        <SingleMessage message={message} ind={ind} />
      ))}
    </div>
  )
}

export default Messages
