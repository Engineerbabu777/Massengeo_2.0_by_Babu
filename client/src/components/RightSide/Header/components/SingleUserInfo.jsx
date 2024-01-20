import React from 'react'
import { findOtherUsers } from '../../../../utils/otherUsers'
import Avatar from './Avatar'
import useUser from '../../../../hooks/useUser'

const SingleUserInfo = ({ activeChat, isGroupChat }) => {
  const { updateBlockUnBlockUsers } = useUser()

  const handleBlockUnblockUsers = async () => {
    await updateBlockUnBlockUsers((activeChat?.users)[0]?._id, 'block')
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
        {/* BLOCK THIS USER!! */}
        <button
          onClick={handleBlockUnblockUsers}
          className='w-[95%] items-center justify-center rounded-md bg-red-500 text-white font-bold p-2 mt-12 hover:bg-red-700'
        >
          Block this user
        </button>

        {/* UNLOCK THIS USER!! */}

        {/* REPORT THIS USER!! */}
        <button className='w-[95%] items-center justify-center rounded-md bg-blue-500 text-white font-bold p-2 mt-6 hover:bg-blue-700'>
          Report this user
        </button>
      </section>
    </>
  )
}

export default SingleUserInfo
