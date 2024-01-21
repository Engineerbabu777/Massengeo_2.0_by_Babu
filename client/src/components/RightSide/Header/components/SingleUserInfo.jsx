import React from 'react'
import { findOtherUsers } from '../../../../utils/otherUsers'
import Avatar from './Avatar'
import useUser from '../../../../hooks/useUser'

const SingleUserInfo = ({ activeChat, isGroupChat, isBlocked }) => {
  const { updateBlockUnBlockUsers } = useUser()

  const handleBlockUnblockUsers = async (type) => {
    await updateBlockUnBlockUsers((findOtherUsers(activeChat?.users))[0]?._id, type)
  }

  return (
    <>
      <div className='flex flex-col w-full border-b-2 border-gray-500 p-4'>
        {/* IMAGE FOR SINGLE CHAT NOW!! */}
        {!isGroupChat && (
          <div className='flex items-center justify-center'>
            <Avatar
              src={findOtherUsers(activeChat.users)[0].avatar}
              info
              userId={findOtherUsers(activeChat.users)[0]._id}
            />
          </div>
        )}

        {/* NAME FOR SINGLE CHAT NOW!! */}
        {!isGroupChat && (
          <p className='text-center mt-4 text-3xl font-bold'>
            <span>{findOtherUsers(activeChat.users)[0].username}</span>
          </p>
        )}

        {/* EMAIL OF USER FOR SINGLE CHAT NOW! */}
        {!isGroupChat && (
          <p className='text-center mt-4 text-gray-400'>
            <span>{findOtherUsers(activeChat.users)[0].email}</span>
          </p>
        )}
      </div>

      {/* ABOUT!! */}
      <p className=' p-4 text-gray-400 flex flex-col border-b-2 border-gray-500'>
        <span className='text-lg'>About</span>
        <span className='text-xl text-neutral-100 italic text-overflow-wrap'>
          {findOtherUsers(activeChat.users)[0]?.about ||
            'Hey there, I am using massengero 2.0😎'}
        </span>
      </p>

      <section className='w-full flex flex-col items-center justify-center'>
        {!isBlocked ? (
          <>
            {/* BLOCK THIS USER!! */}
            <Button
              text='Block this user'
              onClick={() => handleBlockUnblockUsers('block')}
              type='block'
            />
          </>
        ) : (
          <>
            {/* UNLOCK THIS USER!! */}
            <Button
              text='UnBlock this user'
              onClick={() => handleBlockUnblockUsers('unblock')}
              type='unblock'
            />
          </>
        )}

        {/* REPORT THIS USER!! */}
        <Button text='Report this user' onClick={() => {}} type='report' />
      </section>
    </>
  )
}

export default SingleUserInfo

function Button ({onClick, text, type}) {
  const blockedStyles =
    'w-[95%] items-center justify-center rounded-md bg-red-500 text-white font-bold p-2 mt-12 hover:bg-red-700'
  const unBlockStyles =
    'w-[95%] items-center justify-center rounded-md bg-yellow-500 text-white font-bold p-2 mt-12 hover:bg-yellow-700'
  const reportStyles =
    'w-[95%] items-center justify-center rounded-md bg-blue-500 text-white font-bold p-2 mt-6 hover:bg-blue-700'

  return (
    <button
      onClick={onClick}
      className={
        type === 'block'
          ? blockedStyles
          : type === 'report'
          ? reportStyles
          : unBlockStyles
      }
    >
      {text}
    </button>
  )
}
