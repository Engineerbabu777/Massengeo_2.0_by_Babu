import Avatar from './Avatar'

import { FaAngleDown } from '../../../../icons'

export default function ChatInfo ({ openSideModal,src,name }) {
  return (
    <>
      <div className='flex items-center gap-2'>
        {/* IMAGE */}
        <Avatar sm src={src} />

        {/* NAME */}
        <span className={`text-white font-bold text-md`}>{name}</span>


        {/* DOWN */}
        <FaAngleDown
          className='w-4 h-4 text-gray-400'
          onClick={openSideModal}
        />
      </div>
    </>
  )
}
