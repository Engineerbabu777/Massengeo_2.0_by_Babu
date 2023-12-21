


import React from 'react'
import SingleOption from './SingleOption'

function Slides() {
  return (
    <div className='w-full flex justify-between items-center w-[95%] mx-auto font-sans'>
        <SingleOption option={'All conversations'} active/>
        <SingleOption option={'Unread'} />
        <SingleOption option={'Groups'} />
        <SingleOption option={'Archived'} />
    </div>
  )
}

export default Slides