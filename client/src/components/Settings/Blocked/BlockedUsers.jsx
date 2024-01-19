import React from 'react'
import SingleComponent from './SingleComponent'

const BlockedUsers = () => {
  return (
    <>
      <section className='m-5'>
        {/* HEADER! */}
        <h1 className='text-3xl text-white font-bold tracking-wider '>
          Blocked Users
        </h1>

        {/* GRIDS AT LEAST 5 ON THIS SCREEN! */}
        <section className='grid grid-cols-4 gap-4 mt-12'>
          <SingleComponent username={'Elon Musk'} avatar={'/images/pic4.jpg'} />
          <SingleComponent
            username={'Mark Zuckerburg'}
            avatar={'/images/pic3.webp'}
          />
          <SingleComponent
            username={'Allu Arjun'}
            avatar={'/images/pic7.jpg'}
          />
          <SingleComponent
            username={'Kajal Aggarwal'}
            avatar={'/images/pic9.webp'}
          />

          <SingleComponent username={'Elon Musk'} avatar={'/images/pic4.jpg'} />
          <SingleComponent
            username={'Mark Zuckerburg'}
            avatar={'/images/pic3.webp'}
          />
          <SingleComponent
            username={'Allu Arjun'}
            avatar={'/images/pic7.jpg'}
          />
          <SingleComponent
            username={'Kajal Aggarwal'}
            avatar={'/images/pic9.webp'}
          />
          <SingleComponent username={'Elon Musk'} avatar={'/images/pic4.jpg'} />
          <SingleComponent
            username={'Mark Zuckerburg'}
            avatar={'/images/pic3.webp'}
          />
          <SingleComponent
            username={'Allu Arjun'}
            avatar={'/images/pic7.jpg'}
          />
          <SingleComponent
            username={'Kajal Aggarwal'}
            avatar={'/images/pic9.webp'}
          />

          <SingleComponent username={'Elon Musk'} avatar={'/images/pic4.jpg'} />
          <SingleComponent
            username={'Mark Zuckerburg'}
            avatar={'/images/pic3.webp'}
          />
          <SingleComponent
            username={'Allu Arjun'}
            avatar={'/images/pic7.jpg'}
          />
          <SingleComponent
            username={'Kajal Aggarwal'}
            avatar={'/images/pic9.webp'}
          />m r
        </section>
      </section>
    </>
  )
}

export default BlockedUsers
