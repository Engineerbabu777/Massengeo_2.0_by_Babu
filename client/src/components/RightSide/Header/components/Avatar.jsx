export default function Avatar ({ src, sm, online = false }) {
  return (
    <>
      <div
        className={`rounded-full relative ${sm ? '':'mr-5'} }`}
      >
        <img src={src} alt='test' className={`overflow-hidden rounded-full object-cover ${
          sm ? 'w-10 h-10' : 'w-20 h-20'
        }`} />
        {online && (
          <div
            className={` bg-green-500 rounded-full w-6 h-6 absolute animate-pulse right-1 bottom-1`}
          />
        )}
      </div>
    </>
  )
}
