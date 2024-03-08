import React from 'react'
import {GrAdd} from 'react-icons/gr';
import {userDetails} from '../../../../../utils/getUserDetails';

function AddStory ({}) {

    
  return (
    <div className='min-w-16 min-h-16 w-16 h-16 border-2 border-[#F05454] rounded-full bg-blue-600/40  flex items-center justify-center relative'>
      <img src={userDetails?.avatar} alt="img" className='object-cover min-h-16 min-w-16 rounded-full'/>

      {/* ADD BTN! */}
      <div className="absolute -bottom-0.5 flex items-center justify-center -right-1.5 rounded-full bg-[#F05454] w-8 h-8 cursor-pointer hover:bg-blue-500">
        <GrAdd className='w-4 h-4 text-white' />
      </div>
    </div>
  )
}

export default AddStory
