import { useEffect } from 'react'
import ChatSection from './components/Chats/ChatSection'
import Header from './components/Header'
import StoriesParent from './components/Stories/StoriesParent'
import useUser from '../../hooks/useUser'
import SearchUsers from './components/SearchUsers/SearchUsers'
import toast from 'react-hot-toast'
import {
  updateAllUnreadAsRead,
  updateConversationsOnRealtime,
  updateMessageIsRead,
  updateMessagesOnRealtime,
  updateOnlineUsers,
  allMessagesAreDelivered
} from '../../redux/chatSlice'
import { useSelector, useDispatch } from 'react-redux'
import { socket } from '../RightSide/Messages/Messages'

export default function MiddleSideBar () {
  const sidebarState = useSelector(state => state.sidebar.active)

  // CREATING CLIENT SIDE SOCKET CONNECTION!
  const dispatch = useDispatch()

  useEffect(() => {
    // ONCE THE USER IS CONNECTED!
    socket.emit('update-user-is-online-now', {
      userId: JSON.parse(localStorage.getItem('userData@**@user')).id,
      clientId: socket.id
    })

    // UPDATE USER ACTIVE STATUS!!
    socket.on(
      'update-active-users',
      ({ onlineUsers, clientId, usersActiveConversations }) => {
        toast.success('client online!')
        console.log({ onlineUsers })
        if (clientId !== socket.id) {
          dispatch(updateOnlineUsers({ onlineUsers }))
          // ALSO CHECK IF THE CONVERSATION OPEN WITH THIS USER!
          console.log(usersActiveConversations)
          // if (
          //   Object.values(usersActiveConversations)?.includes(
          //     window?.location?.pathname?.split('/')[1]
          //   )
          // ) {
          //   dispatch(allMessagesAreDelivered())
          // }
        }
      }
    )

    // socket.on(
    //   'update-user-connected-conversation',
    //   ({ clientId, usersActiveConversations }) => {
    //     console.log(Object.values(usersActiveConversations))
    //     // if (
    //     //   clientId !== socket.id &&
    //     //   Object.values(usersActiveConversations)?.includes(
    //     //     window?.location?.pathname?.split('/')[1]
    //     //   )
    //     // ) {
    //     //   dispatch(allMessagesAreDelivered())
    //     // }
    //   }
    // )

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
    <>
      <aside className='bg-[#0c0415] w-[25vw] h-screen pt-6 border-r-2 border-gray-700 '>
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
