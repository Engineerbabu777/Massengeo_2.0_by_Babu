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
      <aside className='bg-[#161A30] w-20 h-screen border-r-2 border-gray-600 flex flex-col items-center  py-4'>
        {/* LOGO! */}
        <div className='mb-20'>
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
          className='text-white hover:text-red-600 cursor-pointer '
        />
      </aside>
    </>
  )
}
