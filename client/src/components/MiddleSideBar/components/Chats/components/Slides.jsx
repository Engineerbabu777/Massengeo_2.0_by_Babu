import React from 'react'
import SingleOption from './SingleOption'
import { Options } from '../../../../../constants'

function Slides ({ onChangeSlide, selectedSlide }) {
  return (
    <div className='w-full flex justify-between items-center px-3 font-sans'>
      <SingleOption
        option={'All conversations'}
        active={selectedSlide === Options[0]}
        onClick={() => onChangeSlide(Options[0])}
      />
      <SingleOption
        option={'Unread'}
        active={selectedSlide === Options[1]}
        onClick={() => onChangeSlide(Options[1])}
      />
      <SingleOption
        option={'Groups'}
        active={selectedSlide === Options[2]}
        onClick={() => onChangeSlide(Options[2])}
      />
      <SingleOption
        option={'Archived'}
        active={selectedSlide === Options[3]}
        onClick={() => onChangeSlide(Options[3])}
      />
    </div>
  )
}

export default Slides
