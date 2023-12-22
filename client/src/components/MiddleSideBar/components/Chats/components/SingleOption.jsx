import React from 'react'

function SingleOption ({ option, active = false, onClick }) {
  return (
    <>
      <span
        onClick={onClick}
        className={`transition duration-300 ease-in-out relative text-gray-500 font-semibold text-xl hover:text-[#F05454] cursor-pointer ${
          active ? '!text-[#F05454]' : ''
        }`}
      >
        {option}
        {
          <div
            className={`h-2 w-10 ml-4 rounded-lg ${
              active ? 'bg-[#F05454]' : ''
            } `}
          />
        }
      </span>
    </>
  )
}

export default SingleOption
