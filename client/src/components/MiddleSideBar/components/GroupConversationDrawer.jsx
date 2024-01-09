import { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import useUser from '../../../hooks/useUser'
import { CiSearch, GoSearch, FaUserGroup } from '../../../icons'
import SingleUser from './SearchUsers/components/SingleUser'

export default function GroupSidebarDrawer ({ closeModal, open }) {
  const [input, setInput] = useState('')
  const searchUsers = useSelector(state => state.user.searchUsers)

  const { findUsers } = useUser()

  // THIS FUNCTION WILL HANDLE SEARCH ON KEY ENTER WILL BE PRESSED!
  const handleSearch = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (input.length > 3) findUsers(input)
    }
  }

  return (
    <>
      <div
        onClick={closeModal}
        className={`bg-black/50 fixed left-0 z-[999] right-0 top-0 bottom-0 transition-all duration-500 backdrop-blur-sm ${
          open ? ' visible opacity-1 ' : ' hidden opacity-0 '
        }`}
      />
      <div
        className={`w-[25vw] h-screen bg-black/90 z-[9999] fixed left-0 top-0 bottom-0 transition duration-500 
        ${open ? '  !text-red-500' : '  translate-x-[-25vw]  '}
        `}
      >
        {/* BODY!! */}
        <p className='text-white text-2xl font-semibold p-2'>
          {/* USERS WILL BE DISPLAYED HERE! */}

          {/* HEADER! */}
          <>
            <nav className='flex mx-3'>
              <h2 className='text-3xl text-white font-bold flex-1 font-sans tracking-wider text-center mt-8'>
                Create Group Conversations
              </h2>
            </nav>
          </>

          {/* SEARCH AS WELL EACH USER (WILL MAKE A SEPARATE COMPONENT LATER)! */}
          {/* INPUT! */}
          <section className=' mt-12 w-[95%] mx-auto '>
            <label className='bg-[#272829] border-slate-500 border rounded-full px-3 py-2 flex justify-center items-center'>
              <CiSearch className='text-gray-500 w-8 h-8' />
              <input
                name='search'
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => handleSearch(e)}
                type='text'
                placeholder='Search For Users...'
                className='flex-1 px-2 py-1 bg-inherit border-none outline-none text-white font-semibold text-lg'
              />
            </label>
          </section>

          {/* USERS! */}
          <section className='mt-12 flex flex-col gap-4 h-[calc(100vh-255px)] overflow-auto no-scrollbar'>
            {searchUsers?.map((user, i) => (
              <SingleUser
                name={user?.username}
                src={user?.avatar}
                key={i}
                _id={user?._id}
              />
            ))}
          </section>
        </p>
      </div>
    </>
  )
}
