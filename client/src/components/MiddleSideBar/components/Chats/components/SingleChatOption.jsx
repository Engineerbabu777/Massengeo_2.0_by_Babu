import useMessages from '../../../../../hooks/useMessages'
import { updateOpenChat } from '../../../../../redux/chatSlice'
import { formatTimeAgo } from '../../../../../utils/getLastMessageTime'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { socket } from '../../../../RightSide/Messages/Messages'

export default function SingleChatOption ({ conversation, createdAt, users }) {
  // const isUnread = chat?.unread > 0 ? true : false;
  // const isActive = chat?.active ? true : false;
  // const isGrouped = chat?.isGroup ? true : false;
  const { fetchChatByConversation } = useMessages()
  const openedChatUsers = useSelector(state => state.chat.openedChatUsers)

  // CHECKING IS MESSAGE SENT BY ME OTHERS!
  const isSentByMe =
    conversation?.lastMessage?.senderId ===
    JSON.parse(localStorage.getItem('userData@**@user'))?.id

  const { conversationId } = useParams()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isActive = conversationId === conversation._id ? true : false

  // console.log({
  //   isSentByMe,
  //   mineId: JSON.parse(localStorage.getItem('userData@**@user'))?.id,
  //   otherId: conversation?.lastMessage?.senderId?,
  //   other: conversation
  // })

  const isGrouped = false
  const isUnread = false

  const handleClick = () => {
    // FETCH CHAT!
    fetchChatByConversation(conversation._id)
    // UPDATE THE STATE!
    dispatch(updateOpenChat({ users, conversationId: conversation._id })) // FOR NOW ONLY ONE USER! WILL UPDATE IT LATER!
    // MOVE TO CONVERSATION PAGE
    navigate(`/${conversation._id}`)

    setTimeout(() => {
      
      socket.emit('marked-all-unread-as-read', {
        conversationId: conversation._id,
        userId: JSON.parse(localStorage.getItem('userData@**@user'))?.id
      })

      socket.emit('update-user-is-online-now', {
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
        <img
          className='w-16 h-16 rounded-full object-cover '
          alt='test0image'
          src={users?.avatar}
        />

        {/* NAME & MESSAGE! */}
        <section className={`flex-1 ml-6 flex flex-col gap-0.5 `}>
          <p
            className={`text-gray-100 font-bold text-xl group-hover:text-white ${
              isActive ? 'text-white' : ''
            }`}
          >
            {users?.username}
          </p>
          <p
            className={`text-gray-400 font-semibold group-hover:text-white tracking-wider line-clamp-1 ${
              isActive ? 'text-white' : ''
            }`}
          >
            {isGrouped ? (
              <>
                {' '}
                {/*WILL CHECK IT LATER!*/}
                {/* <span className='font-bold text-gray-300'>
                  {chat?.message?.name}
                </span>
                : {chat?.message?.message} */}
              </>
            ) : (
              <>
                {' '}
                {isSentByMe && 'me: '}
                {conversation?.lastMessage?.message || 'start a conversation'}
              </>
            )}
          </p>
        </section>

        {/* TIME UNREADS! */}
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
          {/* {isUnread && (
            <p
              className={`text-gray-400 font-semibold ml-auto mr-2 text-white bg-[#F05454] w-6 h-6 rounded-full flex items-center justify-center ${
                isActive ? 'bg-white !text-black ' : ''
              }`}
            >
              {chat?.unread}
            </p>
          )} */}
        </section>
      </div>
    </>
  )
}
