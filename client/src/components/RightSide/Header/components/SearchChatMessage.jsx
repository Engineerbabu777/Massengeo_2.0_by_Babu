import { CiSearch } from '../../../../icons'

export default function SearchChatMessage ({}) {
  return (
    <>
      <div className='border-2 border-gray-400 rounded-full flex overflow-hidden p-1 px-6 mr-7'>
        <CiSearch className='w-7 h-7 text-gray-200' />
        <input
          type='text'
          className='w-[180px] bg-inherit text-white border-none outline-none text-lg'
        />
      </div>
    </>
  )
}
