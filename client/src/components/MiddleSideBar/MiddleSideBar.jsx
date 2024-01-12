import { useEffect } from 'react'
import ChatSection from './components/Chats/ChatSection'
import Header from './components/Header'
import StoriesParent from './components/Stories/StoriesParent'
import SearchUsers from './components/SearchUsers/SearchUsers'
import toast from 'react-hot-toast'
import {
  updateAllUnreadAsRead,
  updateConversationsOnRealtime,
  updateMessageIsRead,
  updateMessagesOnRealtime,
  updateMessagesWithDeletedOne,
  updateMessagesWithEditedMessage,
  updateOnlineUsers,
  updateUnreadCounts
} from '../../redux/chatSlice'
import { useSelector, useDispatch } from 'react-redux'
import { socket } from '../RightSide/Messages/Messages'
import useMessages from '../../hooks/useMessages'

export default function MiddleSideBar () {
  const sidebarState = useSelector(state => state.sidebar.active)
  const { fetchChatByConversation } = useMessages()
  const messageNotification = new Audio('/newmessage.mp3')

  // CREATING CLIENT SIDE SOCKET CONNECTION!
  const dispatch = useDispatch()

  useEffect(() => {
    // ONCE THE USER IS CONNECTED!
    socket.emit('update-user-is-online-now', {
      userId: JSON.parse(localStorage.getItem('userData@**@user')).id,
      clientId: socket.id,
      username: JSON.parse(localStorage.getItem('userData@**@user')).username
    })

    // UPDATE USER ACTIVE STATUS!!
    socket.on(
      'update-active-users',
      ({ onlineUsers, clientId, username, offline }) => {
        if (clientId !== socket.id) {
          if (offline) toast.success(username + ' is online!')

          dispatch(updateOnlineUsers({ onlineUsers }))
          // ONLY IF ANY CHAT ID IS OPEN!
          if (window?.location?.pathname?.split('/')[1]) {
            fetchChatByConversation(window?.location?.pathname?.split('/')[1])
          }
        }
      }
    )

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
          dispatch(
            updateUnreadCounts({ conversationId: data.updatedConversation._id })
          )
          socket.emit('update-unread-count-to-0', {
            conversationId: data.updatedConversation._id,
            userId: JSON.parse(localStorage.getItem('userData@**@user')).id
          })
        }
      }
    })

    // UPDATE EDITED MESSAGE ON REAL_TIME!!
    socket.on('edited-message-received', ({ data, clientId }) => {
      if (clientId !== socket.id) {
        // DISPATCH!
        dispatch(updateConversationsOnRealtime(data.updatedConversation))
        dispatch(updateMessagesWithEditedMessage(data.editedMessage))

      }
    })

    // UPDATE EDITED MESSAGE ON REAL_TIME!!
    socket.on('deleted-message-received', ({ data, clientId }) => {
      if (clientId !== socket.id) {
        // DISPATCH!
        dispatch(updateConversationsOnRealtime(data.updatedConversation))
        dispatch(updateMessagesWithDeletedOne(data.deletedMessage))

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

  const handleClick = () => {
    messageNotification.play();
  }
  return (
    <>
      <aside className='bg-[#0c0415] w-[25vw] h-screen pt-6 border-r-2 border-gray-700 overflow-hidden '>
        <button className='hidden' onClick={handleClick} id='btnClick'></button>
        {/* IF ACTIVE STATE IS CHAT! */}
        {sidebarState === 'chats' && (
          <>
            {/* HEADER! */}
            <Header />

            {/* STORIES! */}
            <StoriesParent />

            {/* CHAT SECTION! */}
            <ChatSection />
          </>
        )}

        {/* IF ACTIVE STATE IS SEARCH FOR USERS! */}
        {sidebarState === 'users' && (
          <>
            <SearchUsers />
          </>
        )}

        {/* NOTIFICATIONS!! */}

        {/* SETTINGS! */}
      </aside>
    </>
  )
}
