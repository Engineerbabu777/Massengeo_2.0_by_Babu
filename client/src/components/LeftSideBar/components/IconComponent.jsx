export default function IconComponent ({
  Icon,
  active,
  chats = false,
  onClick
}) {
  return (
    <>
      <p
        onClick={onClick}
        className={`flex items-center justify-center transition duration-150 ${
          active ? 'text-white' : 'text-gray-400'
        } rounded-md cursor-pointer hover:bg-[#F05454] hover:text-white py-2 px-2 ${
          active ? 'bg-[#F05454]' : ''
        } ${
          chats
            ? ' text-white bg-[#F05454] !w-10 !h-10 !rounded-full ml-4 '
            : ' '
        }`}
      >
        <Icon size={30} />
      </p>
    </>
  )
}
