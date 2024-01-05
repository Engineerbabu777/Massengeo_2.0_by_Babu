import React, { useEffect, useState } from 'react'
import Header from '../components/RightSide/Header/Header'
import SidebarModal from '../components/RightSide/Header/components/SidebarModal'
import Messages, { socket } from '../components/RightSide/Messages/Messages'
import Footer from '../components/RightSide/Footer/Footer'
import toast from 'react-hot-toast'
import {
  updateAllUnreadAsRead,
  updateConversationsOnRealtime,
  updateMessageIsRead,
  updateMessagesOnRealtime,
  updateOnlineUsers
} from '../redux/chatSlice'
import { useSelector, useDispatch } from 'react-redux'

function ChatPage () {
  const [open, setOpen] = useState(false)
  // CREATING CLIENT SIDE SOCKET CONNECTION!
  // CREATING CLIENT SIDE SOCKET CONNECTION!
  const dispatch = useDispatch()

  useEffect(() => {
    // ONCE THE USER IS CONNECTED!
    socket.emit('update-user-is-online-now', {
      userId: JSON.parse(localStorage.getItem('userData@**@user')).id,
      clientId: socket.id
    })

    // UPDATE USER ACTIVE STATUS!!
    socket.on('update-active-users', ({ onlineUsers, clientId }) => {
      if (clientId !== socket.id) {
        dispatch(updateOnlineUsers({ onlineUsers }))
      }
    })

    // ON RECEIVED OF NEW MESSAGE!
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
      socket.emit('disconnect', {
        userId: JSON.parse(localStorage.getItem('userData@**@user')).id
      })
    }
  }, []) // Empty dependency array ensures the effect runs only once on component mount

  return (
    <div className='bg-[#0c0415] h-screen flex-1 flex flex-col'>
      {/* SIDEBAR!!(FIXED) */}
      <SidebarModal closeModal={() => setOpen(!open)} open={open} />

      {/* HEADER! */}
      <Header openSideModal={() => setOpen(true)} />

      {/* MESSAGES */}
      <Messages />

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default ChatPage
