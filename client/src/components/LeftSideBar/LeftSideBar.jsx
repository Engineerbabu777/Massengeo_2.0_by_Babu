import {
  CgLogOff,
  IoLogoMastodon,
  IoNotifications,
  IoSettingsSharp,
  MdOutlineMessage,
  FaUserGroup
} from '../../icons'
import { updateSidebar } from '../../redux/sidebarSlice'
import IconComponent from './components/IconComponent'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function LeftSideBar ({}) {
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const active = useSelector(state => state.sidebar.active)

  const updateActiveState = active => {
    dispatch(updateSidebar(active))
  }

  const handleNavigate = (navigateTo, option) => {
    updateActiveState(option)
    navigation(navigateTo)
  }

  return (
    <>
      <aside className='backdrop-blur-lg bg-[#1A132F] w-20 h-screen border-r-2 border-gray-700 flex flex-col items-center  py-5 pt-6'>
        {/* LOGO! */}
        <div className='mb-[15vh]'>
          <IoLogoMastodon size={40} className='text-white' />
        </div>
        {/* ICONS! */}
        <div className='flex flex-col gap-8 flex-1'>
          <IconComponent
            Icon={MdOutlineMessage}
            active={active === 'chats'}
            onClick={() => handleNavigate('/', 'chats')}
          />
          <IconComponent
            Icon={FaUserGroup}
            active={active === 'users'}
            onClick={() => handleNavigate('/friends', 'users')}
          />
          <IconComponent
            Icon={IoNotifications}
            active={active === 'notifications'}
            onClick={() => handleNavigate('/notifications', 'notifications')}
          />
          <IconComponent
            Icon={IoSettingsSharp}
            active={active === 'settings'}
            onClick={() => handleNavigate('/settings', 'settings')}
          />
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
