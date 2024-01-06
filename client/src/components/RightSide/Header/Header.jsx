import Avatar from './components/Avatar'
import ChatInfo from './components/ChatInfo'
import GroupChat from './components/GroupChat'
import SearchChatMessage from './components/SearchChatMessage'
import SingleChat from './components/SingleChat'
import { useSelector } from 'react-redux'

export default function Header ({ openSideModal, open }) {
  const chatUserData = useSelector(state => state.chat.openedChatUsers)

  return (
    <div className='border-b-2 border-gray-700 px-5 py-3 flex items-center'>
      {/* IMAGE! */}
      <Avatar src={chatUserData?.avatar} userId={chatUserData._id} />

      {/* NAME & LAST SEEN for single chats */}
      <SingleChat name={chatUserData?.username} userId={chatUserData._id} />

      {/* NAME & members length for group chats */}
      {/* <GroupChat /> */}

      {/* SEARCH FOR CHAT */}
      <SearchChatMessage />

      {/* INFO about single chat */}
      <ChatInfo
        openSideModal={openSideModal}
        open={open}
        src={chatUserData?.avatar}
        name={chatUserData?.username}
      />
    </div>
  )
}
