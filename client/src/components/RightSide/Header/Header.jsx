import { userDetails } from '../../../utils/getUserDetails'
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
  const typingUsers = useSelector(state => state.chat.userTyping)

  const isTyping =
    typingUsers?.filter(d => {
      if (
        d.conversationId === conversationInfo?._id &&
        d.userId !== userDetails.id
      ) {
        return d
      } else {
        return null
      }
    }).length > 0

    console.log(isTyping)

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
          conversationInfo?.group
            ? null
            : findOtherUsers(conversationInfo?.users)[0]._id
        }
      />

      {/* NAME & LAST SEEN for single chats */}
      {!conversationInfo?.group && (
        <SingleChat
          name={findOtherUsers(conversationInfo?.users)[0].username}
          userId={findOtherUsers(conversationInfo?.users)[0]._id}
          isTyping={isTyping}
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
