import { useState } from 'react'
import { CiSearch, GoSearch, FaUserGroup } from '../../../../icons'
import IconComponent from '../../../LeftSideBar/components/IconComponent'
import SingleUser from './components/SingleUser'
import useUser from '../../../../hooks/useUser'
import { useSelector } from 'react-redux'
import GroupSidebarDrawer from '../GroupConversationDrawer'

export default function SearchUsers ({}) {
  const [input, setInput] = useState('')
  const searchUsers = useSelector(state => state.user.searchUsers)
  const [openSideDrawer, setOpenSideDrawer] = useState(false)

  const { findUsers } = useUser()

  // THIS FUNCTION WILL HANDLE SEARCH ON KEY ENTER WILL BE PRESSED!
  const handleSearch = e => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      if (input.length > 3) findUsers(input)
    }
  }

  return (
    <>
      <GroupSidebarDrawer
        open={openSideDrawer}
        closeModal={() => {
          setOpenSideDrawer(false)
        }}
      />
      {/* HEADER */}
      <nav className='flex mx-3'>
        <h2 className='text-3xl text-white font-bold flex-1 font-sans tracking-wider'>
          Search Users
        </h2>
        {/* ICONS */}
        <IconComponent
          Icon={FaUserGroup}
          chats
          onClick={() => {
            setOpenSideDrawer(true)
          }}
        />
      </nav>

      {/* INPUT! */}
      <section className=' mt-12 w-[95%] mx-auto  '>
        <label className='bg-[#272829] border-slate-400 rounded-full px-3 py-2 flex justify-center items-center'>
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
      <section className='mt-12 flex flex-col gap-4 h-[calc(100vh-220px)] overflow-auto no-scrollbar'>
        {searchUsers?.map((user, i) => (
          <SingleUser
            name={user?.username}
            src={user?.avatar}
            key={i}
            _id={user?._id}
          />
        ))}
      </section>
    </>
  )
}
