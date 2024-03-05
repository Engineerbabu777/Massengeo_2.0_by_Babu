import { useSelector } from 'react-redux'

export default function Avatar ({
  src,
  sm = false,
  userId,
  info = false,
  xs = false,
}) {
  const onlineUsers = useSelector(state => state?.chat?.allOnlineUsers)

  return (
    <>
      <div className={`rounded-full relative ${sm ? '' : xs ? '' : 'mr-5'} }`}>
        <img
          src={src}
          alt='test'
          className={`overflow-hidden rounded-full object-cover ${
            sm
              ? 'w-10 h-10'
              : info
              ? 'w-44 h-44'
              : xs
              ? 'w-16 h-16'
              : 'w-20 h-20'
          }`}
        />
        {onlineUsers?.includes(userId) && (
          <div
            className={` ${
              info
                ? 'right-6 bottom-0 w-12 h-12'
                : xs
                ? 'right-1 bottom-1 w-4 h-4 '
                : 'right-1 bottom-1 w-6 h-6'
            } bg-green-500 rounded-full  absolute animate-pulse `}
          />
        )}
      </div>
    </>
  )
}
