import React from 'react'

const SingleComponent = ({ username, onClick, avatar, friends = false }) => {
  return (
    <div className='flex justify-between w-[100%] mx-auto items-center transition-all group hover:bg-gray-700/50 py-3 px-2 rounded-md cursor-pointer bg-slate-800/50 border-gray-700 border '>
      <img
        src={avatar}
        alt='alternative-text'
        className='min-h-32 min-w-32 max-h-32 max-w-32 rounded-full object-center object-cover'
      />
      <div className={`flex flex-col gap-2 items-center ${friends ? "w-full" : "justify-between max-w-[60%]"} `}>
        <p className={`text-white line-clamp-1 ${friends ? "font-semibold text-2xl text-center" : "text-xl"}`}>{username}</p>
        {!friends && (
          <button
            onClick={onClick}
            className='text-white bg-[#F05454] border-none hover:opacity-[0.7] transition-all duration-300 font-semibold text-lg rounded-md p-2'
          >
            Unblock User
          </button>
        )}
      </div>
    </div>
  )
}

export default SingleComponent
