export default function SingleChat ({name}) {
  return (
    <div className='flex flex-col flex-1'>
      <span className={`text-white font-bold text-xl`}>{name}</span>
      <span className='text-gray-500 text-md font-semibold'>Online/Offline</span>
    </div>
  )
}
