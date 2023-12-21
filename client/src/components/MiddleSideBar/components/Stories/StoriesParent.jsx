import React from 'react'
import SingleStory from './SingleStory'

function StoriesParent () {
  return (
    <div className='mx-auto w-[95%] mt-10 flex gap-8 no-scrollbar overflow-auto'>
      <SingleStory src={'/images/pic1.jpg'} />
      <SingleStory src={'/images/pic2.jpg'} />
      <SingleStory src={'/images/pic3.webp'} />
      <SingleStory src={'/images/pic4.jpg'} />
      <SingleStory src={'/images/pic5.jpg'} />
      <SingleStory src={'/images/pic6.jpg'} />
      <SingleStory src={'/images/pic3.webp'} />
      <SingleStory src={'/images/pic4.jpg'} />
      <SingleStory src={'/images/pic5.jpg'} />
      <SingleStory src={'/images/pic6.jpg'} />{' '}
      <SingleStory src={'/images/pic3.webp'} />
      <SingleStory src={'/images/pic4.jpg'} />
      <SingleStory src={'/images/pic5.jpg'} />
      <SingleStory src={'/images/pic6.jpg'} />{' '}
      <SingleStory src={'/images/pic3.webp'} />
      <SingleStory src={'/images/pic4.jpg'} />
      <SingleStory src={'/images/pic5.jpg'} />
      <SingleStory src={'/images/pic6.jpg'} />{' '}
      <SingleStory src={'/images/pic3.webp'} />
      <SingleStory src={'/images/pic4.jpg'} />
      <SingleStory src={'/images/pic5.jpg'} />
      <SingleStory src={'/images/pic6.jpg'} />
    </div>
  )
}

export default StoriesParent
