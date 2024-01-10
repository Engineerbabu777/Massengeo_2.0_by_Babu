import React from 'react'

const GroupChat = ({name,participants}) => {
  return (
    <div className='flex flex-col flex-1'>
       <span className={`text-white font-bold text-xl`}>{name}</span>
      <span className='text-gray-500 text-md font-semibold'>you, {participants-1} others</span>
    </div>
  )
}

export default GroupChat
