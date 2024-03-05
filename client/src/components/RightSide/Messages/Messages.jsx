import React, { useEffect, useRef } from 'react'
import SingleMessage from './components/SingleMessage'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'
import { userDetails } from '../../../utils/getUserDetails'

export const socket = io('http://localhost:4444') // EXPORTING TO USE IT EVERY WHERE
const Messages = () => {
  const refVal = useRef(null)

  const messages = useSelector(state => state?.chat?.activeUserMessages)
  const activeChatInfo = useSelector(state => state?.chat?.activeConversationInfo);

  const scrollToBottom = () => {
    refVal.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

 
  return (
    <section className='flex-1 flex flex-col py-1 px-5 gap-6 h-[calc(100vh-270px)] pb-6 overflow-scroll no-scrollbar pt-4'>
      {messages?.length &&
        messages.map((message, ind) => (
          <SingleMessage message={message} ind={ind} 
          isAdmin={activeChatInfo.groupAdmins.map(a => a._id).includes(message?.senderId?._id) ? true : false} 
          />
        ))}
      <div className='text-red-500' ref={refVal} />
    </section>
  )
}

export default Messages
