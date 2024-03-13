import { useEffect, useState } from 'react'
import ChatSection from './components/Chats/ChatSection'
import Header from './components/Header'
import StoriesParent from './components/Stories/StoriesParent'
import SearchUsers from './components/SearchUsers/SearchUsers'
import toast from 'react-hot-toast'
import {
  updateAllUnreadAsRead,
  updateConversationInfo,
  updateConversationsOnRealtime,
  updateConversationsWithNewConversation,
  updateMessageIsRead,
  updateMessagesOnRealtime,
  updateMessagesWithDeletedOne,
  updateMessagesWithEditedMessage,
  updateOnlineUsers,
  updateUnreadCounts,
  updateUsersTyping
} from '../../redux/chatSlice'
import { useSelector, useDispatch } from 'react-redux'
import { socket } from '../RightSide/Messages/Messages'
import useMessages from '../../hooks/useMessages'
import IconComponent from '../LeftSideBar/components/IconComponent'
import { CiSettings } from 'react-icons/ci'
import { updateSidebar } from '../../redux/sidebarSlice'
import { IoIosNotifications } from 'react-icons/io'
import { FaShieldCat, FaUserPen } from 'react-icons/fa6'
import { MdBlockFlipped, MdPrivacyTip } from 'react-icons/md'
import SingleSettingsOption from './components/Settings/components/SingleOption'
import { updateActiveSettingState } from '../../redux/settingSlice'
import { userDetails } from '../../utils/getUserDetails'
import { findMySelf } from '../../utils/otherUsers'
import { updateUserStoriesInRealtime } from '../../redux/userSlice'

export default function MiddleSideBar () {
  const sidebarState = useSelector(state => state.sidebar.active)
  const activeSetting = useSelector(state => state.setting.activeSetting)

  const { fetchChatByConversation } = useMessages()
  const messageNotification = new Audio('/newmessage.mp3')
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
        }
      }
    )

    // UPDATE CONVERSATIONS ON REALTIME!!
    socket.on('update-created-conversation', ({ clientId, data }) => {
      if (clientId !== socket.id) {
        if (userDetails.id === findMySelf(data.users)[0]?._id) {
          toast.success('Needs to update now!')

          dispatch(updateConversationsWithNewConversation(data))
        }
      }
    })

    // ON RECEIVED OF NEW MESSAGE!
    socket.on('message-received', ({ data, clientId }) => {
      if (clientId !== socket.id) {
        // DISPATCH!
        dispatch(updateConversationsOnRealtime(data.updatedConversation))
        dispatch(updateMessagesOnRealtime(data.newMessage))
console.log(data);
        if (
          window.location.pathname.split('/')[1] ===
          data?.updatedConversation?._id
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
            // ALSO NEED TO UPDATE THE LAST MESSAGE IN THE CONVERSATION AS WELL!
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

    // UPDATE GROUP DATA HERE BY DISPATCHING !
    socket.on(
      'update-group-data-now',
      ({ clientId, conversationData }) => {
        if (clientId !== socket.id) {
          // DISPATCH AN EVENT FOR UPDATING GROUP CONVERSATION DATA!
         dispatch(updateConversationInfo(conversationData));
        }
      }
    )

    dispatch(
      updateSidebar(
        window.location.pathname.split('/')[1].length > 15
          ? 'chats'
          : window.location.pathname.split('/')[1]
      )
    )

    // HANDLING USER TYPING!
    socket.on('update-users-typing', ({ userTypingWithMessages, clientId }) => {
      if (clientId !== socket.id) {
        dispatch(updateUsersTyping(userTypingWithMessages))
      }
    })

    // HANDLING USER STORIES!
    socket.on('update-story', ({clientId, updatedUser,_id}) => {
      if (clientId !== socket.id) {
        dispatch(updateUserStoriesInRealtime({updatedUser,_id}))
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
    messageNotification.play()
  }

  const handleUpdateSettingState = state => {
    dispatch(updateActiveSettingState(state))
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
        {sidebarState === 'notifications' && (
          <>
            {/* HEADER! */}
            <nav className='flex mx-3'>
              <h2 className='text-3xl text-white font-bold flex-1 font-sans tracking-wider'>
                Notifications
              </h2>

              {/* ICONS */}
              <IconComponent Icon={IoIosNotifications} chats />
            </nav>
          </>
        )}

        {/* SETTINGS! */}
        {sidebarState === 'settings' && (
          <>
            {/* HEADER! */}
            <nav className='flex mx-3'>
              <h2 className='text-3xl text-white font-bold flex-1 font-sans tracking-wider'>
                Settings
              </h2>

              {/* ICONS */}
              <IconComponent Icon={CiSettings} chats />
            </nav>

            {/* OPTIONS! */}
            <>
              <section className='mt-20 flex flex-col gap-6'>
                <SingleSettingsOption
                  option={'User Settings'}
                  ICON={FaUserPen}
                  onClick={() => {
                    handleUpdateSettingState('user')
                  }}
                  selected={activeSetting === 'user'}
                />
                <SingleSettingsOption
                  option={'Privacy Settings'}
                  ICON={MdPrivacyTip}
                  onClick={() => {
                    handleUpdateSettingState('privacy')
                  }}
                  selected={activeSetting === 'privacy'}
                />
                <SingleSettingsOption
                  option={'Blocked Users'}
                  ICON={MdBlockFlipped}
                  onClick={() => {
                    handleUpdateSettingState('block')
                  }}
                  selected={activeSetting === 'block'}
                />

                <div
                  onClick={() => {
                    handleUpdateSettingState('premium')
                  }}
                  className={`flex gap-6 w-[95%] mx-auto items-center transition-all group hover:bg-gray-700/50 py-4 px-1 rounded-md cursor-pointer bg-slate-800/50 border-gray-700 border text-white ${
                    activeSetting === 'premium' ? ' !bg-gray-700/50 ' : ''
                  }`}
                >
                  <IconComponent Icon={FaShieldCat} premium />
                  <span className='font-bold text-xl text-[#F05454]'>
                    Get Premium Features
                  </span>
                </div>
              </section>
            </>
          </>
        )}
      </aside>
    </>
  )
}
