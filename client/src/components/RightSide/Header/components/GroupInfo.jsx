import React from 'react'
import { findMySelf, findOtherUsers } from '../../../../utils/otherUsers'
import Avatar from './Avatar'

const GroupInfo = ({ activeChat }) => {
  const [showFullUsers, setShowFullUsers] = React.useState(false)

  return (
    <>
      <div className='flex flex-col w-full border-b-2 border-gray-500 p-4'>
        {/* IMAGE FOR SINGLE CHAT NOW!! */}
        <div className='flex items-center justify-center'>
          <Avatar src={activeChat?.avatar} info />
        </div>

        {/* NAME FOR GROUP CHAT NOW!! */}
        <p className='text-center mt-4 text-3xl font-bold'>
          <span>{activeChat?.groupName}</span>
        </p>

        {/* NUMBER OF PARTICIPANTS! */}
        <p className='text-center mt-4 text-xl font-normal text-neutral-300'>
          <span>{activeChat?.users?.length} group members</span>
        </p>
      </div>

      {/* ABOUT!! */}
      <p className=' p-4 text-gray-400 flex flex-col border-b-2 border-gray-500'>
        <span className='text-lg'>About</span>
        <span className='text-xl text-neutral-100 italic text-overflow-wrap'>
          {activeChat?.about || 'Hey there, I am using massengero 2.0😎'}
        </span>
      </p>

      {/* USERS NAMES! */}
      <section className='flex flex-col p-4 '>
        <span className='text-lg text-gray-400'>Group Members</span>
        {findMySelf(activeChat?.users).map(u => (
          <div
            className={`py-1 
                `}
          >
            <p className='font-bold text-white text-xl -mb-1'>You</p>
            <p className='text-lg text-gray-400 font-semibold italic'>
              {u?.about || 'Hey there, I am using massengero 2.0😎'}
            </p>
          </div>
        ))}

        {!showFullUsers &&
          findOtherUsers(activeChat?.users)
            .slice(0, 1)
            ?.map((u, i) => (
              <>
                <div
                  className={`py-1 
              `}
                >
                  <p className='font-bold text-white text-xl -mb-1'>
                    {u?.username}
                  </p>
                  <p className='text-lg text-gray-400 font-semibold italic'>
                    {u?.about || 'Hey there, I am using massengero 2.0😎'}
                  </p>
                </div>
              </>
            ))}
        {showFullUsers &&
          findOtherUsers(activeChat?.users)?.map((u, i) => (
            <>
              <div
                className={`py-1 
              `}
              >
                <p className='font-bold text-white text-xl -mb-1'>
                  {u?.username}
                </p>
                <p className='text-lg text-gray-400 font-semibold italic'>
                  {u?.about || 'Hey there, I am using massengero 2.0😎'}
                </p>
              </div>
            </>
          ))}
        {showFullUsers ? (
          <p
            className='text-[#F05454] text-base cursor-pointer mt-2 text-center w-full'
            onClick={() => setShowFullUsers(false)}
          >
            hide users...
          </p>
        ) : (
          <p
            className='text-[#F05454] text-base cursor-pointer mt-2 text-center w-full'
            onClick={() => setShowFullUsers(true)}
          >
            show all users...
          </p>
        )}
      </section>

      <section className='w-full flex flex-col items-center justify-center'>
        {/* BLOCK THIS USER!! */}
        <button className='w-[95%] items-center justify-center rounded-md bg-red-500 text-white font-bold p-2 mt-12 hover:bg-red-700'>
          leave this group
        </button>

        {/* UNLOCK THIS USER!! */}

        {/* REPORT THIS USER!! */}
        <button className='w-[95%] items-center justify-center rounded-md bg-blue-500 text-white font-bold p-2 mt-6 hover:bg-blue-700'>
          Report this group
        </button>
      </section>
    </>
  )
}

export default GroupInfo
