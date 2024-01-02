import React, { useEffect, useRef } from 'react'
import SingleMessage from './components/SingleMessage'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'
import toast from 'react-hot-toast'
import {
  updateConversationsOnRealtime,
  updateMessagesOnRealtime
} from '../../../redux/chatSlice'

export const socket = io('http://localhost:4444') // EXPORTING TO USE IT EVERY WHERE
const Messages = () => {
  const refVal = useRef(null)
  const dispatch = useDispatch()

  const messages = useSelector(state => state?.chat?.activeUserMessages)

  console.log({ messages })

  const scrollToBottom = () => {
    refVal.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // CREATING CLIENT SIDE SOCKET CONNECTION!
  useEffect(() => {
    socket.on('message-received', ({ data, clientId }) => {
      if (clientId !== socket.id) {
        console.log({ data })
        toast.success('message received from ' + clientId)
        // DISPATCH!
        dispatch(updateConversationsOnRealtime(data.updatedConversation))
        dispatch(updateMessagesOnRealtime(data.newMessage))
      }
    })
    // Clean up the WebSocket connection on component unmount
    return () => {
      socket.emit('disconnect', () =>
        console.log('Disconnected from the WebSocket server')
      )
    }
  }, []) // Empty dependency array ensures the effect runs only once on component mount

  return (
    <section className='flex-1 flex flex-col py-1 px-5 gap-6 h-[calc(100vh-270px)] pb-6 overflow-scroll no-scrollbar pt-4'>
      {messages?.length &&
        messages.map((message, ind) => (
          <SingleMessage message={message} ind={ind} />
        ))}
      <div className='text-red-500' ref={refVal} />
    </section>
  )
}

export default Messages
