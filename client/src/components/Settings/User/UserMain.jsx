import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'

const UserMain = () => {
  const [userDetails, setUserDetails] = useState({
    username: 'Elon Musk',
    email: 'elonmusk123@gmail.com',
    password: '*********',
    avatar: '',
    about: ''
  })

  const onChangeInputHandler = event => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value })
  }

  const onChangeImageHandler = event => {}

  return (
    <div className='flex items-center justify-center mt-[100px] flex-col gap-6'>
      {/* IMAGE! */}
      <div className='rounded-full w-[200px] h-[200px] relative'>
        <img
          src={'/images/pic4.jpg'}
          alt='alt-text'
          className='overflow-hidden w-full h-full rounded-full object-cover'
        />

        <label className='bg-[#007700] flex items-center justify-center w-12 h-12 rounded-full cursor-pointer absolute right-5 bottom-1'>
          <MdEdit className='w-8 h-8 text-white' />
          <input type='file' className='hidden' name='avatar' />
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

      {/* PASSWORD! */}
      <div className='flex flex-col gap-1'>
        <label className='text-gray-500 text-2xl font-bold'>Password:</label>
        <input
          onChange={onChangeInputHandler}
          name='password'
          type='password'
          value={userDetails.password}
          placeholder='Enter your password....'
          className='flex-1 px-4 py-2 bg-inherit rounded-md outline-none text-white font-semibold text-xl border-2 border-gray-700 w-[450px]'
        />
      </div>

      <button className='bg-[#F05454] text-white rounded-md w-[450px] h-[52px] font-semibold tracking-wide text-xl'>
        Update Information
      </button>
    </div>
  )
}

export default UserMain
