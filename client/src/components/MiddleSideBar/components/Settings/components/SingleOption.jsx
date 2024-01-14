import React from 'react'
import IconComponent from '../../../../LeftSideBar/components/IconComponent'

const SingleSettingsOption = ({ ICON, option, onClick, selected }) => {
  return (
    <div
      onClick={onClick}
      className={`flex gap-6 w-[95%] mx-auto items-center transition-all group hover:bg-gray-700/50 py-4 px-1 rounded-md cursor-pointer bg-slate-800/50 border-gray-700 border text-white ${
        selected ? ' !bg-gray-700/50 ' : ''
      }`}
    >
      <IconComponent Icon={ICON} />
      <span className='font-semibold text-xl'>{option}</span>
    </div>
  )
}

export default SingleSettingsOption
