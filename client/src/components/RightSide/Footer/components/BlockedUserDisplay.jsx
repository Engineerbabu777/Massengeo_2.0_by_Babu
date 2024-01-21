import React from 'react'
import { LuAlertCircle } from 'react-icons/lu'

const BlockedUserDisplay = ({ blockedByMe }) => {
  return (
    <div className=' mb-4 mx-5 flex gap-3 text-center '>
      <p className='text-gray-500 text-xl gap-2 flex-1 border-2 border-gray-800 rounded-lg p-3 flex items-center justify-center'>
        <LuAlertCircle className='w-6 h-6 text-yellow-500' />{' '}
        {blockedByMe
          ? 'You have blocked this user.'
          : 'This user has blocked has you. Can\'t send Messages anymore 😭😭'}
        <span className='cursor-pointer text-gray-400 rounded-md underline hover:text-white'>
          {blockedByMe && 'unblock'}
        </span>
      </p>
    </div>
  )
}

export default BlockedUserDisplay
