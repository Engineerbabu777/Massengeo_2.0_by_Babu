import React from 'react'
import Avatar from '../../../Header/components/Avatar'

const OtherUserMessage = ({ message }) => {
  return (
    <section className='flex max-w-[75%] gap-2'>
      {/* AVATAR! */}
      <Avatar src='/images/pic4.jpg' sm test/>
      <div className=''>
        <div className='bg-gray-400 rounded-r-xl mr-auto rounded-tl-xl px-8 py-4 text-white text-xl '>
          {message.message}
        </div>
        {/* TIME! */}
        <span className='text-gray-400 font-semibold'>Musk 5:15am</span>
      </div>
    </section>
  )
}

export default OtherUserMessage
