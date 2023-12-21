


import React from 'react'

function SingleStory({src}) {
  return (
    <div className='min-w-16 min-h-16 w-16 h-16 border-2 border-[#F05454] rounded-full bg-blue-600/40 overflow-hidden flex items-center justify-center'>
      <img src={src} alt="img" className='object-cover min-h-full min-w-full'/>
    </div>
  )
}

export default SingleStory