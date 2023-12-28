import { formatTimeAgoMoment } from "../../../../../utils/getLastMessageTime"

export default function SingleChatOption ({ conversation }) {
  // const isUnread = chat?.unread > 0 ? true : false;
  // const isActive = chat?.active ? true : false;
  // const isGrouped = chat?.isGroup ? true : false;
  const isActive = false
  const isGrouped = false
  const isUnread = false
  return (
    <>
      <div
        className={`max-w-[25vw] px-3 flex items-center font-sans py-3 ${
          false ? 'bg-[#F05454]' : ''
        }`}
      >
        {/* IMAGE */}
        <img
          className='w-16 h-16 rounded-full object-cover '
          alt='test0image'
          src={conversation?.avatar}
        />

        {/* NAME & MESSAGE! */}
        <section className={`flex-1 ml-6 flex flex-col gap-0.5 `}>
          <p
            className={`text-gray-100 font-bold text-xl ${
              isActive ? 'text-white' : ''
            }`}
          >
            {conversation?.username}
          </p>
          <p
            className={`text-gray-400 font-semibold tracking-wider line-clamp-1 ${
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
            className={` font-bold text-md text-gray-400 ${
              isActive ? 'text-white' : ''
            }`}
          >
            {' '}
            {/* ELSE LAST MESSAGE TIME!*/}
            {formatTimeAgoMoment(conversation?.createdAt)}
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
