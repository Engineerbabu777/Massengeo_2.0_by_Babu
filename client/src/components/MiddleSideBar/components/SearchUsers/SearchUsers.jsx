import { CiSearch, GoSearch, FaUserGroup } from '../../../../icons'
import IconComponent from '../../../LeftSideBar/components/IconComponent'

export default function SearchUsers ({}) {
  return (
    <>
      {/* HEADER */}
      <nav className='flex mx-3'>
        <h2 className='text-3xl text-white font-bold flex-1 font-sans tracking-wider'>
          Search Users
        </h2>
        {/* ICONS */}
        <IconComponent Icon={FaUserGroup} chats />
      </nav>

      {/* INPUT! */}
      <section className=' mt-12 w-[95%] mx-auto '>
        <label className='bg-[#272829] border-slate-400 rounded-full px-3 py-2 flex justify-center items-center'>
          <CiSearch className='text-gray-500 w-8 h-8' />
          <input
            type='text'
            placeholder='Search For Users...'
            className='flex-1 px-2 py-1 bg-inherit border-none outline-none text-white font-semibold text-lg'
          />
        </label>
      </section>

      {/* USERS! */}
      <section className='mt-12'>

      </section>
    </>
  )
}
