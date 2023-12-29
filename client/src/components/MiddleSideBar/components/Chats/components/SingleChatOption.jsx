import { updateOpenChat } from '../../../../../redux/chatSlice'
import { formatTimeAgo } from '../../../../../utils/getLastMessageTime'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
export default function SingleChatOption ({ conversation, createdAt, users }) {
  // const isUnread = chat?.unread > 0 ? true : false;
  // const isActive = chat?.active ? true : false;
  // const isGrouped = chat?.isGroup ? true : false;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isActive = false
  const isGrouped = false
  const isUnread = false

  const handleClick = () => {
    // UPDATE THE STATE!
    dispatch(updateOpenChat(users)) // FOR NOW ONLY ONE USER! WILL UPDATE IT LATER!
    // MOVE TO CONVERSATION PAGE
    navigate(`/${conversation._id}`)
  }
  return (
    <>
      <div
        onClick={handleClick}
        className={`max-w-[25vw] px-3 flex items-center hover:bg-[#F05454] transition-all duration-150 cursor-pointer group font-sans py-3 ${
          false ? 'bg-[#F05454]' : ''
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
            {console.log(createdAt)}
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
