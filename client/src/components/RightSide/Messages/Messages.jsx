import React, { useEffect, useRef } from 'react'
import SingleMessage from './components/SingleMessage'
import { useSelector, useDispatch } from 'react-redux'
import io from 'socket.io-client'
import toast from 'react-hot-toast'
import {
  updateAllUnreadAsRead,
  updateConversationsOnRealtime,
  updateMessageIsRead,
  updateMessagesOnRealtime
} from '../../../redux/chatSlice'

export const socket = io('http://localhost:4444') // EXPORTING TO USE IT EVERY WHERE
const Messages = () => {
  const refVal = useRef(null)
  const dispatch = useDispatch()

  const messages = useSelector(state => state?.chat?.activeUserMessages)

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
        // DISPATCH!
        dispatch(updateConversationsOnRealtime(data.updatedConversation))
        dispatch(updateMessagesOnRealtime(data.newMessage))

        if (
          window.location.pathname.split('/')[1] ===
          data.updatedConversation._id
        ) {
          socket.emit('message-read-by-user', {
            conversationId: data.updatedConversation._id,
            newMessage: data.newMessage,
            socketIdOfUser: socket.id,
            userIdToAdd: JSON.parse(localStorage.getItem('userData@**@user')).id
          })
        }
      }
    })

    // UPDATE THAT SINGLE MESSAGE AS READ!
    socket.on(
      'mark-message-as-read',
      ({ newMessage, clientId, conversationId, userIdToAdd }) => {
        // UPDATE THE MESSAGE LIST ARRAY ONLY IF!!
        if (window?.location?.pathname?.split('/')[1] === conversationId) {
          if (clientId !== socket.id) console.log('good!')
          dispatch(
            updateMessageIsRead({
              conversationId,
              _id: newMessage._id,
              userIdToAdd
            })
          )
        }
      }
    )

    // UPDATE ALL UNREAD AS READ!
    socket.on('update-as-read', ({ clientId, userId, conversationId }) => {
      if (clientId !== socket.id) {
        if (window?.location?.pathname?.split('/')[1] === conversationId) {
          dispatch(
            updateAllUnreadAsRead({ conversationId, userIdToAdd: userId })
          )
        }
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
