export default function SingleChatOption ({ chat }) {

    const isUnread = chat?.unread > 0 ? true : false;
    const isActive = chat?.active ? true : false;

  return (
    <>
      <div className={` px-3 flex items-center font-sans py-3 ${isActive ? 'bg-[#F05454]' : ''}`}>
        {/* IMAGE */}
        <img
          className='w-16 h-16 rounded-full object-cover '
          alt='test0image'
          src={chat?.profile}
        />

        {/* NAME & MESSAGE! */}
        <section className={`flex-1 ml-6 flex flex-col gap-0.5 `}>
          <p className={`text-gray-100 font-bold text-xl ${isActive?'text-white':''}`}>{chat?.name}</p>
          <p className={`text-gray-400 font-semibold tracking-wider truncate ${isActive?'text-white':''}`}>
            {chat?.message}
          </p>
        </section>

        {/* TIME UNREADS! */}
        <section className=' ml-6 flex flex-col gap-0.5 '>
          <p className={` font-bold text-md text-gray-400 ${isActive?'text-white':''}`}>{chat?.time}</p>
          {isUnread && <p className={`text-gray-400 font-semibold ml-auto mr-2 text-white bg-[#F05454] w-6 h-6 rounded-full flex items-center justify-center ${isActive?' bg-white text-black ':''}`}>
            {chat?.unread}
          </p>}
        </section>
      </div>
    </>
  )
}
