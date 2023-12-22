import React from 'react'
import {
  FaMicrophone,
  IoIosSend,
  MdOutlineEmojiEmotions,
  MdAttachFile
} from '../../../icons'

const Footer = () => {
  return (
    <div className=' mb-4 mx-5 flex gap-3'>
      <section className='flex border-2 border-gray-800 rounded-lg p-3 flex-1'>
        {/* FILE ICON */}
        <MdAttachFile className='text-gray-500 w-8 h-8 cursor-pointer' />

        {/* INPUT */}
        <input
          type='text'
          placeholder='Type a message...'
          className='flex-1 px-2 py-1 bg-inherit border-none outline-none text-white font-semibold text-lg'
        />

        {/* EMOJI ICON */}
        <MdOutlineEmojiEmotions className='text-gray-500 w-8 h-8 cursor-pointer' />

        {/* MICROPHONE */}
        <FaMicrophone className='text-gray-500 w-8 h-8 ml-3 cursor-pointer' />
      </section>

      <button className='p-2 rounded-md bg-[#F05454]'>
         <IoIosSend className='w-10 h-10 text-white'/>
      </button>
    </div>
  )
}

export default Footer
