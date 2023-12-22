/* eslint-disable no-lone-blocks */
import React, { useState } from 'react'
import Slides from './components/Slides'
import SingleChatOption from './components/SingleChatOption'
import { ChatsData, Options } from '../../../../constants'

function ChatSection () {
  const [selectedSlide, setSelectedSlide] = useState(Options[0])
  const chatState =
    selectedSlide === 'all'
      ? ChatsData
      : selectedSlide === 'unread'
      ? ChatsData.filter(chat => chat.unread)
      : selectedSlide === 'groups'
      ? ChatsData.filter(chat => chat.isGroup)
      : ChatsData.filter(chat => chat.isArchived)

  const onChangeSlide = val => setSelectedSlide(val)

  return (
    <div className='mt-8 flex flex-col'>
      {/* slides! */}
      <Slides onChangeSlide={onChangeSlide} selectedSlide={selectedSlide} />

      {/* chats */}
      <div className='mt-8 flex flex-col h-[calc(100vh-270px)] gap-4 overflow-auto no-scrollbar pb-6'>
        {chatState?.map((chat, ind) => {
          return (
            <>
              <SingleChatOption chat={chat} key={ind} />
            </>
          )
        })}
      </div>
    </div>
  )
}

export default ChatSection
