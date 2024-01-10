/* eslint-disable no-lone-blocks */
import React, { useEffect, useState } from 'react'
import Slides from './components/Slides'
import SingleChatOption from './components/SingleChatOption'
import { Options } from '../../../../constants'
import useConversation from '../../../../hooks/useConversation'
import { useSelector } from 'react-redux'
import { findOtherUsers } from '../../../../utils/otherUsers'
import { socket } from '../../../RightSide/Messages/Messages'

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
    if (JSON.parse(localStorage.getItem('userData@**@user'))?.id) {
      socket.emit('update-user-is-online-now', {
        userId: JSON.parse(localStorage.getItem('userData@**@user'))?.id
      })
    }
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
          const unreadCount =
            conversation?.unreadCount?.userId ===
            JSON.parse(localStorage.getItem('userData@**@user'))?.id
              ? conversation.unreadCount?.count
              : 0
          const time =
            conversation?.lastMessage?.createdAt || conversation?.createdAt
          return (
            <>
              <SingleChatOption
                users={users}
                key={ind}
                conversation={conversation}
                createdAt={time}
                unreadCount={unreadCount}
              />
            </>
          )
        })}
      </div>
    </div>
  )
}

export default ChatSection
