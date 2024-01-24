import { useSelector } from 'react-redux'

export default function SingleChat ({ name, userId, isTyping }) {
  const onlineUsers = useSelector(state => state.chat.allOnlineUsers)

  console.log({ onlineUsers })

  return (
    <div className='flex flex-col flex-1'>
      <span className={`text-white font-bold text-xl`}>{name}</span>
      <span
        className={`${
          onlineUsers?.includes(userId) ? 'text-green-600' : 'text-gray-500'
        } text-md font-semibold`}
      >
        {isTyping
          ? 'typing...'
          : onlineUsers?.includes(userId)
          ? 'Online'
          : 'Offline'}
      </span>
    </div>
  )
}
