import React from 'react'
import Avatar from '../../../Header/components/Avatar'
import {IoCheckmarkDoneSharp} from '../../../../../icons';

const MineMessage = ({ message }) => {
  return (
    <section className='flex ml-auto max-w-[75%] gap-2'>
      {/* TEXT */}
      <div className=' w-full flex flex-col'>
        <div className='bg-[#F05454] rounded-l-xl  rounded-tr-xl px-8 py-4 text-white text-xl '>
          {message.message}
        </div>
        {/* TIME! */}
        <span className='text-gray-400 font-semibold text-right flex gap-1 justify-end'>
          Babu 5:17am
          <IoCheckmarkDoneSharp className='text-green-600 w-6 h-6'/>
        </span>
      </div>
      {/* AVATAR! */}
      <div className='w-16 h-16 rounded-full '>
        <Avatar src='/images/pic8.jpg' sm />
      </div>
    </section>
  )
}

export default MineMessage
