import { useState } from 'react'
import useUser from '../hooks/useUser'
import { Link } from 'react-router-dom'

export default function LoginPage ({}) {
  const { loadingUser, userLogin } = useUser()
  const [login, setlogin] = useState({
    password: '',
    email: ''
  })

  const onChange = event => {
    setlogin({ ...login, [event.target.name]: event.target.value })
  }

  const handleSubmit = event => {
    event.preventDefault() // prevent page reload
    // CREATING API!!
    userLogin(login)
  }
  return (
    <>
      <section className='flex bg-[#0c0415] justify-center items-center h-screen w-screen flex-col gap-3'>
        <h1 className='text-3xl text-white font-sans font-bold'>Log in</h1>
        <form className='flex gap-2 flex-col gap-1' onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <label className='text-slate-500 font-semibold text-lg'>
              Email
            </label>
            <input
              className='px-2 py-2 rounded-sm bg-slate-300  outline-none border-none w-[350px]'
              placeholder='John123@gmail.com'
              value={login.email}
              onChange={onChange}
              name='email'
            />
          </div>
          <div className='flex flex-col'>
            <label className='text-slate-500 font-semibold text-lg'>
              Password
            </label>
            <input
              className='px-2 py-2 rounded-sm bg-slate-300  outline-none border-none w-[350px]'
              placeholder='*******'
              value={login.password}
              onChange={onChange}
              name='password'
            />
          </div>

          <button
            type='submit'
            disabled={loadingUser}
            className='bg-[#F05454] disabled:bg-gray-700 disabled:text-white text-white w-full rounded-md h-[40px] font-semibold  text-lg tracking-wider mt-8 '
          >
            {loadingUser ? 'loading...' : 'Log in'}
          </button>
        </form>
        <p className='flex items-center gap-1'>
          <p className='text-gray-400'>Not have an account?</p>
          <Link
            className='text-[#F05454] font-semibold cursor-pointer'
            to='/register'
          >
            {' '}
            Sign in
          </Link>
        </p>
      </section>
    </>
  )
}
