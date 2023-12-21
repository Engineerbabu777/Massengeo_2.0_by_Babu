export default function IconComponent ({ Icon, active = false }) {
  return (
    <>
      <p
        className={`${
          active ? 'text-white' : 'text-gray-400'
        } rounded-md cursor-pointer hover:bg-[#F05454] hover:text-white py-2 px-2 ${
          active ? 'bg-[#F05454]' : ''
        } `}
      >
        <Icon size={30} />
      </p>
    </>
  )
}
