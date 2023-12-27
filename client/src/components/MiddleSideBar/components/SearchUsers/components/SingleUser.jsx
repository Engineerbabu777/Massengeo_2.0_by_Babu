export default function SingleUser ({ src, name }) {
  return (
    <>
      <section className='flex justify-between w-[95%] mx-auto items-center transition-all group hover:bg-gray-700/50 py-2 px-1 rounded-md cursor-pointer'>
        <div className='flex grow items-center gap-3'>
          {/* AVATAR! */}
          <img
            src='/images/pic1.jpg'
            alt='2'
            className='w-16 h-16 rounded-full object-cover object-fit'
          />
          {/* NAME! */}
          <span className='text-white text-2xl font-semibold'>Ayush Kumar</span>
        </div>

        {/* ADD! */}
        <button className='bg-[#272829] px-3 py-2 min-w-[100px] text-lg text-gray-300 group-hover:text-black group-hover:bg-gray-200 transition-all rounded-md font-semibold text-lg'>
          Add
        </button>
      </section>
    </>
  )
}
