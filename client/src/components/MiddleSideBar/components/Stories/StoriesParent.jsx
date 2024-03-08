import React from 'react'
import SingleStory from './SingleStory'
import AddStory from './AddStoryModal/AddStory'

function StoriesParent () {
  return (
    <div className='mx-auto w-[95%] mt-10 flex gap-8 no-scrollbar overflow-auto'>
      {/* OPTION TO SHARE MY STORY! */}
       {/* ADD STORY! */}
       <AddStory addStory/>

      {/* STORIES OF FRIENDS!! */}
      <SingleStory src={'/images/pic1.jpg'} />
    </div>
  )
}

export default StoriesParent
