import { useState } from 'react'
import useUser from '../hooks/useUser'

export default function RegisterPage ({}) {
  const [register, setRegister] = useState({
    username: '',
    password: '',
    email: ''
  })
  const { userRegistration } = useUser()

  const onChange = event => {
    setRegister({ ...register, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault() // prevent page reload
    // CREATING API!!
    userRegistration(register)
  }
  return (
    <>
      <section className='flex bg-[#0c0415] justify-center items-center h-screen w-screen flex-col gap-3'>
        <h1 className='text-3xl text-white font-sans font-bold'>Sign Up</h1>
        <form className='flex gap-2 flex-col gap-1' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='text-slate-500 font-semibold text-lg'>
              Username
            </label>
            <input
              className='px-2 py-2 rounded-sm bg-slate-300  outline-none border-none w-[350px]'
              placeholder='John123'
              value={register.username}
              onChange={onChange}
              name="username"
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-slate-500 font-semibold text-lg'>
              Email
            </label>
            <input
              className='px-2 py-2 rounded-sm bg-slate-300  outline-none border-none w-[350px]'
              placeholder='John123@gmail.com'
              value={register.email}
              name="email"
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-slate-500 font-semibold text-lg'>
              Password
            </label>
            <input
              className='px-2 py-2 rounded-sm bg-slate-300  outline-none border-none w-[350px]'
              placeholder='*******'
              value={register.password}
              name="password"
            />
          </div>

          <button
            type='submit'
            className='bg-[#F05454] text-white w-full rounded-md h-[40px] font-semibold  text-lg tracking-wider mt-8 '
          >
            Create an account
          </button>
        </form>
        <p className='flex items-center gap-1'>
          <p className='text-gray-400'>Already have an account?</p>
          <a
            className='text-[#F05454] font-semibold cursor-pointer'
            href={'/login'}
          >
            {' '}
            Log in
          </a>
        </p>
      </section>
    </>
  )
}
