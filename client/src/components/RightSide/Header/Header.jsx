import { findOtherUsers } from '../../../utils/otherUsers'
import Avatar from './components/Avatar'
import ChatInfo from './components/ChatInfo'
import GroupChat from './components/GroupChat'
import SearchChatMessage from './components/SearchChatMessage'
import SingleChat from './components/SingleChat'
import { useSelector } from 'react-redux'

export default function Header ({ openSideModal, open }) {
  const conversationInfo = useSelector(
    state => state.chat.activeConversationInfo
  )

  return (
    <div className='border-b-2 border-gray-700 px-5 py-3 flex items-center'>
      {/* IMAGE! */}
      <Avatar
        src={
          conversationInfo?.group
            ? conversationInfo?.avatar
            : findOtherUsers(conversationInfo?.users)[0].avatar
        }
        userId={
          conversationInfo
            ? null
            : findOtherUsers(conversationInfo?.users)[0]._id
        }
      />

      {/* NAME & LAST SEEN for single chats */}
      {!conversationInfo?.group && (
        <SingleChat
          name={findOtherUsers(conversationInfo?.users)[0].username}
          userId={findOtherUsers(conversationInfo?.users)[0]._id}
        />
      )}

      {/* NAME & members length for group chats */}
      {conversationInfo?.group && (
        <GroupChat
          name={conversationInfo?.groupName}
          participants={conversationInfo?.users.length}
        />
      )}

      {/* SEARCH FOR CHAT */}
      <SearchChatMessage />

      {/* INFO about single chat */}
      <ChatInfo
        openSideModal={openSideModal}
        open={open}
        src={
          conversationInfo.group
            ? conversationInfo?.avatar
            : findOtherUsers(conversationInfo?.users)[0].avatar
        }
        name={
          conversationInfo.group
            ? conversationInfo?.groupName
            : findOtherUsers(conversationInfo?.users)[0].username
        }
      />
    </div>
  )
}
