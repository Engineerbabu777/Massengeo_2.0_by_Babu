import IconComponent from '../../LeftSideBar/components/IconComponent'
import { FaUserGroup, RiEditFill } from '../../../icons'

export default function Header ({}) {
  return (
    <>
      <nav className='flex mx-3'>
        <h2 className="text-3xl text-white font-bold flex-1 font-sans tracking-wider">Chats</h2>

        {/* ICONS */}
        <IconComponent  Icon={RiEditFill} chats />
        <IconComponent Icon={FaUserGroup} chats/>
      </nav>
    </>
  )
}
