/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import Slides from './components/Slides'
import SingleChatOption from './components/SingleChatOption'
import { Options } from '../../../../constants'
import useConversation from '../../../../hooks/useConversation'
import { useSelector } from 'react-redux'
import { findOtherUsers } from '../../../../utils/otherUsers'

function ChatSection ({}) {
  const [selectedSlide, setSelectedSlide] = useState(Options[0])
  const { fetchConversations } = useConversation()
  const conversations = useSelector(state => state.chat.conversations)

  // const chatState =
  //   selectedSlide === 'all'
  //     ? ChatsData
  //     : selectedSlide === 'unread'
  //     ? ChatsData.filter(chat => chat.unread)
  //     : selectedSlide === 'groups'
  //     ? ChatsData.filter(chat => chat.isGroup)
  //     : ChatsData.filter(chat => chat.isArchived)

  const onChangeSlide = val => setSelectedSlide(val)

  useEffect(() => {
    fetchConversations()
  }, [])

  return (
    <div className='mt-8 flex flex-col'>
      {/* slides! */}
      <Slides onChangeSlide={onChangeSlide} selectedSlide={selectedSlide} />

      {/* chats */}
      <div className='mt-8 flex flex-col h-[calc(100vh-270px)] gap-4 overflow-auto no-scrollbar pb-6'>
        {conversations?.map((conversation, ind) => {
          const users = findOtherUsers(conversation.users)
          const lastMessage = conversation.lastMessage;
          return <>
          <SingleChatOption conversation={users[0]} key={ind} />
          </>
        })}
      </div>
    </div>
  )
}

export default ChatSection
