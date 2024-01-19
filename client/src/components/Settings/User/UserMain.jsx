import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import toast from 'react-hot-toast'
import { userDetails as userData } from '../../../utils/getUserDetails'
import { uploadImageToCloudinary } from '../../../utils/uploadImageToCloudinary'
import useUser from '../../../hooks/useUser'
import { useSelector } from 'react-redux'

const UserMain = () => {
  const { updateUserData } = useUser()
  const isUpdatingUser = useSelector(state => state.user.updatingUser)

  const [userDetails, setUserDetails] = useState({
    username: userData.username,
    email: userData.email,
    avatar: userData.avatar,
    about: userData.about
  })

  // ONCHANGE INPUT HANDLER!
  const onChangeInputHandler = event => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value })
  }

  // UPLOAD IMAGE HANDLER!
  const onChangeImageHandler = async event => {
    const data = await uploadImageToCloudinary(event)
    setUserDetails({ ...userDetails, avatar: data.secure_url })
  }

  // ONSUBMIT FUNCTION!
  const onSubmitHandler = () => {
    // WILL MOVE TO UTILS LATER!
    if (
      !userDetails.username ||
      !userDetails.email ||
      !userDetails.avatar ||
      !userDetails.about
    ) {
      toast.error('Please fill all the fields!')
    } else {
      updateUserData(userDetails)
    }
  }

  return (
    <div className='flex items-center justify-center mt-[100px] flex-col gap-6'>
      {/* IMAGE! */}
      <div className='rounded-full w-[200px] h-[200px] relative'>
        <img
          src={userDetails.avatar}
          alt='alt-text'
          className='overflow-hidden w-full h-full rounded-full object-cover'
        />

        <label className='bg-[#007700] flex items-center justify-center w-12 h-12 rounded-full cursor-pointer absolute right-5 bottom-1'>
          <MdEdit className='w-8 h-8 text-white' />
          <input
            type='file'
            className='hidden'
            name='avatar'
            onChange={onChangeImageHandler}
          />
        </label>
      </div>

      {/* NAME! */}
      <div className='flex flex-col gap-1'>
        <label className='text-gray-500 text-2xl font-bold'>Username:</label>
        <input
          onChange={onChangeInputHandler}
          value={userDetails.username}
          placeholder='Enter your name....'
          className='flex-1 px-4 py-2 bg-inherit rounded-md outline-none text-white font-semibold text-xl border-2 border-gray-700 w-[450px]'
          name='username'
          type='text'
        />
      </div>

      {/* EMAIL! */}
      <div className='flex flex-col gap-1'>
        <label className='text-gray-500 text-2xl font-bold'>Email:</label>
        <input
          onChange={onChangeInputHandler}
          value={userDetails.email}
          placeholder='Enter your email....'
          name='email'
          type='email'
          className='flex-1 px-4 py-2 bg-inherit rounded-md outline-none text-white font-semibold text-xl border-2 border-gray-700 w-[450px]'
        />
      </div>

      {/* ABOUT! */}
      <div className='flex flex-col gap-1'>
        <label className='text-gray-500 text-2xl font-bold'>About:</label>
        <textarea
          onChange={onChangeInputHandler}
          rows={4}
          value={userDetails.about}
          placeholder='Enter your about....'
          name='about'
          type='about'
          className=' resize-none flex-1 px-4 py-2 bg-inherit rounded-md outline-none text-white font-semibold text-xl border-2 border-gray-700 w-[450px]'
        />
      </div>

      <button
        onClick={onSubmitHandler}
        disabled={isUpdatingUser}
        className='bg-[#F05454] text-white rounded-md w-[450px] h-[52px] font-semibold tracking-wide text-xl'
      >
        {isUpdatingUser ? 'Updating PLease wait' : 'Update Information'}
      </button>
    </div>
  )
}

export default UserMain
