import useMessages from '../../../../../hooks/useMessages'
import {
  updateOpenChat,
  updateUnreadCounts
} from '../../../../../redux/chatSlice'
import { formatTimeAgo } from '../../../../../utils/getLastMessageTime'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { socket } from '../../../../RightSide/Messages/Messages'
import { findOtherUsers } from '../../../../../utils/otherUsers'
import { MdDoNotDisturb } from 'react-icons/md'
import Avatar from '../../../../RightSide/Header/components/Avatar'
import { IoCheckmarkDoneSharp, IoCheckmarkSharp } from 'react-icons/io5'
import { isMessageReadByOrNot } from '../../../../../utils/getIsMessageReadOrNot'
import { userDetails } from '../../../../../utils/getUserDetails'

export default function SingleChatOption ({
  conversation,
  createdAt,
  users,
  unreadCount,
  isOnline = false
}) {
  // const isUnread = chat?.unread > 0 ? true : false;
  // const isActive = chat?.active ? true : false;
  const isGrouped = conversation?.group ? true : false
  const { fetchChatByConversation } = useMessages()

  const openedChatUsers = useSelector(
    state => state.chat.activeConversationInfo?.users
  )

  // GETTING TYPING USERS DATA FROM STORE!
  const typingUsers = useSelector(state => state.chat.userTyping)

  // GETTING IF USER FROM CURRENT ACTIVE ID IS BEEN TYPING WILL GIVE USE TRUE OR FALSE!
  const isTyping =
    typingUsers?.filter(
      d => d.chatId === conversation?._id && d.userId !== userDetails.id
    ).length > 0

  // CHECKING FOR THE USERS TYPING STATUS!

  // CHECKING IS MESSAGE SENT BY ME OTHERS!
  const isSentByMe =
    conversation?.lastMessage?.senderId?._id ===
    JSON.parse(localStorage.getItem('userData@**@user'))?.id

  const deleteForMe = conversation?.lastMessage?.deleteForMe
  const deleteForEveryOne = conversation?.lastMessage?.deleteForEveryOne

  const { conversationId } = useParams()

  const otherUser = findOtherUsers(conversation?.users)

  console.log(conversation)

  // IS MESSAGE READ BY OTHER!
  const isRead = isMessageReadByOrNot(conversation?.lastMessage?.seenBy)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isActive = conversationId === conversation._id ? true : false

  const handleClick = () => {
    // FETCH CHAT!
    fetchChatByConversation(conversation._id)
    // UPDATE THE STATE FOR THE CURRENT USER!
    dispatch(updateUnreadCounts({ conversationId: conversation?._id }))
    dispatch(
      updateOpenChat({
        conversation,
        conversationId: conversation?._id
      })
    ) // FOR NOW ONLY ONE USER! WILL UPDATE IT LATER!
    // MOVE TO CONVERSATION PAGE
    navigate(`/${conversation._id}`)

    setTimeout(() => {
      socket.emit('marked-all-unread-as-read', {
        conversationId: conversation._id,
        userId: JSON.parse(localStorage.getItem('userData@**@user'))?.id
      })

      socket.emit('update-unread-count-to-0', {
        conversationId: conversation._id,
        userId: JSON.parse(localStorage.getItem('userData@**@user'))?.id
      })

      socket.emit('update-user-is-online-now', {
        userId: JSON.parse(localStorage.getItem('userData@**@user'))?.id
      })

      socket.emit('conversation-connected', {
        conversationId: conversation._id,
        userId: JSON.parse(localStorage.getItem('userData@**@user'))?.id
      })
    }, 500)
  }

  return (
    <>
      <div
        onClick={handleClick}
        className={`max-w-[25vw] px-3 flex items-center hover:bg-[#F05454] transition-all duration-150 cursor-pointer group font-sans py-3 ${
          isActive ? 'bg-[#F05454]' : ''
        }`}
      >
        {/* IMAGE */}
        <Avatar
          xs
          src={
            isGrouped
              ? conversation?.avatar
              : findOtherUsers(conversation.users)[0]?.avatar
          }
          userId={isGrouped ? null : findOtherUsers(conversation.users)[0]?._id}
        />

        {/* NAME & MESSAGE! */}
        <section className={`flex-1 ml-6 flex flex-col gap-0.5 `}>
          <p
            className={`text-gray-100 font-bold text-xl group-hover:text-white ${
              isActive ? 'text-white' : ''
            }`}
          >
            {isGrouped
              ? conversation.groupName
              : findOtherUsers(conversation.users)[0]?.username}
          </p>
          <p
            className={`text-gray-400 flex gap-1 items-center font-semibold group-hover:text-white tracking-wider line-clamp-1 ${
              isActive ? 'text-white' : ''
            }`}
          >
            {isTyping ? (
              <span>typing...</span>
            ) : (
              <>
                {isGrouped ? (
                  <>
                    <>
                      {' '}
                      {/* IF THE MESSAGE IS SENT BY ME! */}
                      {isSentByMe &&
                        (!deleteForMe || deleteForEveryOne) && // !false || true
                        (deleteForMe || !deleteForEveryOne) && ( // false || !true
                          <span>
                            {/* FOR NOT DELIVERY OF MESSAGES! */}
                            <IoCheckmarkDoneSharp
                              className={` ${
                                conversation?.lastMessage?.isGroupMessage
                                  ? 'hidden'
                                  : ''
                              } ${
                                conversation?.lastMessage?.deleteForMe ||
                                conversation?.lastMessage?.deleteForEveryOne
                                  ? 'hidden'
                                  : ''
                              } ${
                                conversation?.lastMessage?.delivered
                                  ? isRead
                                    ? 'text-green-500'
                                    : 'text-gray-300'
                                  : 'hidden'
                              } w-5 h-5`}
                            />
                            {/* SINGLE TICK FOR NET DELIVERY OF MESSAGE! */}
                            <IoCheckmarkSharp
                              className={`
          ${conversation?.lastMessage?.isGroupMessage ? 'hidden' : ''} ${
                                conversation?.lastMessage?.deleteForMe ||
                                conversation?.lastMessage?.deleteForEveryOne
                                  ? 'hidden'
                                  : ''
                              } ${
                                conversation?.lastMessage?.delivered
                                  ? isRead
                                    ? 'hidden'
                                    : 'hidden'
                                  : 'text-gray-300'
                              } w-5 h-5
          `}
                            />
                          </span>
                        )}
                      {/* IF THE MESSAGE IS SENT BY OTHERS! */}
                      {!isSentByMe &&
                        (!deleteForMe || deleteForEveryOne) && // !false || true
                        (deleteForMe || !deleteForEveryOne) && ( // false || !true
                          <span>
                            {conversation?.lastMessage?.senderId?.username}
                            {conversation?.lastMessage?.message && ':'}
                          </span>
                        )}
                      {/* OTHER USER CAN SEE THE MESSAGE IF ITS JUST DELETED FOR ME! */}
                      {conversation?.lastMessage?.message &&
                        deleteForMe &&
                        !deleteForEveryOne &&
                        !isSentByMe && (
                          <>{conversation?.lastMessage?.message}</>
                        )}
                      {/* IF DELETED FOR ALL! */}
                      {conversation?.lastMessage?.message &&
                        (deleteForEveryOne || (deleteForMe && isSentByMe)) && (
                          <span className='text-gray-500 flex gap-2 items-center text-sm'>
                            <MdDoNotDisturb className='h-4 w-4' />
                            message was deleted
                          </span>
                        )}
                      {/* IF LAST MESSAGE HAS TO BE DISPLAY! */}
                      {!deleteForMe && !deleteForEveryOne && (
                        <>
                          {conversation?.lastMessage?.message ? (
                            <>
                              {/* IF MESSAGE TYPE IS TEXT! */}
                              {conversation.lastMessage.messageType ===
                                'text' && conversation?.lastMessage?.message}
                              {/* IF MESSAGE TYPE IS IMAGE! */}
                              {conversation.lastMessage.messageType ===
                                'image' && <>An image...</>}
                            </>
                          ) : (
                            <span>start a conversation</span>
                          )}
                        </>
                      )}
                    </>
                  </>
                ) : (
                  <>
                    {' '}
                    {isSentByMe &&
                      (!deleteForMe || deleteForEveryOne) && // !false || true
                      (deleteForMe || !deleteForEveryOne) && ( // false || !true
                        <span>
                          {/* FOR NOT DELIVERY OF MESSAGES! */}
                          <IoCheckmarkDoneSharp
                            className={` ${
                              conversation?.lastMessage?.isGroupMessage
                                ? 'hidden'
                                : ''
                            } ${
                              conversation?.lastMessage?.deleteForMe ||
                              conversation?.lastMessage?.deleteForEveryOne
                                ? 'hidden'
                                : ''
                            } ${
                              conversation?.lastMessage?.delivered
                                ? isRead
                                  ? 'text-green-500'
                                  : 'text-gray-300'
                                : 'hidden'
                            } w-5 h-5`}
                          />
                          {/* SINGLE TICK FOR NET DELIVERY OF MESSAGE! */}
                          <IoCheckmarkSharp
                            className={`
          ${conversation?.lastMessage?.isGroupMessage ? 'hidden' : ''} ${
                              conversation?.lastMessage?.deleteForMe ||
                              conversation?.lastMessage?.deleteForEveryOne
                                ? 'hidden'
                                : ''
                            } ${
                              conversation?.lastMessage?.delivered
                                ? isRead
                                  ? 'hidden'
                                  : 'hidden'
                                : 'text-gray-300'
                            } w-5 h-5
          `}
                          />
                        </span>
                      )}
                    {/* OTHER USER CAN SEE THE MESSAGE IF ITS JUST DELETED FOR ME! */}
                    {conversation?.lastMessage?.message &&
                      deleteForMe &&
                      !deleteForEveryOne &&
                      !isSentByMe && <>{conversation?.lastMessage?.message}</>}
                    {/* IF DELETED FOR ALL! */}
                    {conversation?.lastMessage?.message &&
                      (deleteForEveryOne || (deleteForMe && isSentByMe)) && (
                        <span className='text-gray-500 flex gap-2 items-center text-sm'>
                          <MdDoNotDisturb className='h-4 w-4' />
                          message was deleted
                        </span>
                      )}
                    {/* IF LAST MESSAGE HAS TO BE DISPLAY! */}
                    {!deleteForMe && !deleteForEveryOne && (
                      <>
                        {conversation?.lastMessage?.message ? (
                          <>
                            {/* IF MESSAGE TYPE IS TEXT! */}
                            {conversation.lastMessage.messageType === 'text' &&
                              conversation?.lastMessage?.message}
                            {/* IF MESSAGE TYPE IS IMAGE! */}
                            {conversation.lastMessage.messageType ===
                              'image' && <>An image...</>}
                          </>
                        ) : (
                          <span>start a conversation</span>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </p>
        </section>

        {/* TIME + UNREAD_COUNTS! */}
        <section className=' ml-6 flex flex-col gap-0.5 '>
          <p
            className={` font-bold text-md text-gray-400 group-hover:text-white ${
              isActive ? 'text-white' : ''
            }`}
          >
            {' '}
            {/* ELSE LAST MESSAGE TIME!*/}
            {formatTimeAgo(createdAt)}
          </p>
          <div className='flex items-center gap-1 '>
            {isOnline && (
              <span className='text-green-500 text-sm font-semibold font-monospace ml-auto group-hover:hidden '>
                Online
              </span>
            )}
            <>
              {unreadCount > 0 && (
                <p
                  className={` text-gray-400 font-semibold ml-auto mr-2 text-white bg-[#F05454] w-4 h-4 rounded-full flex items-center justify-center group-hover:bg-white !text-black text-xs ${
                    isActive ? 'bg-white !text-black ' : ''
                  }`}
                >
                  {unreadCount}
                </p>
              )}
            </>
          </div>
        </section>
      </div>
    </>
  )
}
