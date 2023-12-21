import {
  CgLogOff,
  IoLogoMastodon,
  IoNotifications,
  IoSettingsSharp,
  MdOutlineMessage,
  FaUserGroup
} from '../../icons'
import IconComponent from './components/IconComponent'

export default function LeftSideBar ({}) {
  return (
    <>
      <aside className='backdrop-blur-lg bg-[#1A132F] w-20 h-screen border-r-2 border-gray-700 flex flex-col items-center  py-5 pt-6'>
        {/* LOGO! */}
        <div className='mb-[15vh]'>
          <IoLogoMastodon size={40} className='text-white' />
        </div>
        {/* ICONS! */}
        <div className='flex flex-col gap-8 flex-1'>
          <IconComponent Icon={MdOutlineMessage} active />
          <IconComponent Icon={FaUserGroup} />
          <IconComponent Icon={IoNotifications} />
          <IconComponent Icon={IoSettingsSharp} />
        </div>
        {/* LOGOUT! */}
        <CgLogOff
          size={32}
          className='text-white hover:text-red-600 cursor-pointer transition duration-150 '
        />
      </aside>
    </>
  )
}
