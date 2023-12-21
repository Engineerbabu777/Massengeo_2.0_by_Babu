import React from 'react'
import Slides from './components/Slides'
import SingleChatOption from './components/SingleChatOption'

function ChatSection () {
  return (
    <div className='mt-8'>
      {/* slides! */}
      <Slides />

      {/* chats */}
      <div className='mt-8'>
        <SingleChatOption />
      </div>
    </div>
  )
}

export default ChatSection
