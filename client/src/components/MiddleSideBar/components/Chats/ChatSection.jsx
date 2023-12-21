import React from 'react'
import Slides from './components/Slides'
import SingleChatOption from './components/SingleChatOption'
import { ChatsData } from '../../../../constants'

function ChatSection () {
  return (
    <div className='mt-8 flex flex-col'>
      {/* slides! */}
      <Slides />

      {/* chats */}
      <div className='mt-8 flex flex-col h-[calc(100vh-270px)] gap-4 overflow-auto no-scrollbar pb-6'>
        {ChatsData?.map((chat) => {
          return (
            <>
              <SingleChatOption chat={chat} />
            </>
          )
        })}
      </div>
    </div>
  )
}

export default ChatSection
