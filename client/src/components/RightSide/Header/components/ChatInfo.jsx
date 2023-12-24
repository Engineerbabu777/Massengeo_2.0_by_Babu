import Avatar from './Avatar'

import { FaAngleDown } from '../../../../icons'

export default function ChatInfo ({ openSideModal }) {
  return (
    <>
      <div className='flex items-center gap-2'>
        {/* IMAGE */}
        <Avatar sm src={'/images/pic4.jpg'} />

        {/* NAME */}
        <span className={`text-white font-bold text-md`}>Elon Musk</span>


        {/* DOWN */}
        <FaAngleDown
          className='w-4 h-4 text-gray-400'
          onClick={openSideModal}
        />
      </div>
    </>
  )
}
