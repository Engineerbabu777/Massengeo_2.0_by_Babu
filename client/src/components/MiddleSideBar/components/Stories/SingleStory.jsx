import React, { useState } from 'react'
import ViewStoryModal from './components/ViewStoryModal'

function SingleStory ({ user,conversationId,otherUserId }) {
  const [viewStory, setViewStory] = useState(false)

  const handleToggle = () => setViewStory(!viewStory)

  console.log(user?.stories[0])

  return (
    <>
    {viewStory &&  <ViewStoryModal handleClose={handleToggle} open={viewStory} otherUserId={otherUserId} conversationId={conversationId} data={user?.stories[0]} userData={user}/>}
      <div onClick={handleToggle} className='min-w-16 min-h-16 w-16 h-16 border-2 border-[#F05454] rounded-full bg-blue-600/40 overflow-hidden flex items-center justify-center cursor-pointer hover:border-green-500 duration-500 transition-all'>
        <img
        data-twe-lazy-load-init
          src={user?.avatar}
          alt='img'
          className='object-cover min-h-full min-w-full'
        />
      </div>
    </>
  )
}

export default SingleStory
