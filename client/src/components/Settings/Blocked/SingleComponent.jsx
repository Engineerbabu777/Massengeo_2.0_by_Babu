import React from 'react'

const SingleComponent = ({ username, onClick, avatar }) => {
  return (
    <div className='flex justify-between w-[100%] mx-auto items-center transition-all group hover:bg-gray-700/50 py-3 px-2 rounded-md cursor-pointer bg-slate-800/50 border-gray-700 border '>
      <img
        src={avatar}
        alt='alternative-text'
        className='h-32 w-32 rounded-full object-center object-cover'
      />
      <div className='flex flex-col gap-2 items-center justify-center max-w-[60%]'>
        <p className='text-white text-xl line-clamp-1'>{username}</p>
        <button className='text-white bg-[#F05454] border-none hover:opacity-[0.7] transition-all duration-300 font-semibold text-lg rounded-md p-2'>
          Unblock User
        </button>
      </div>
    </div>
  )
}

export default SingleComponent
