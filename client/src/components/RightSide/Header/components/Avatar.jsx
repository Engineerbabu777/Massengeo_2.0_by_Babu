export default function Avatar ({src,sm}) {
  return (
    <>
      <div className={`rounded-full overflow-hidden mr-5 ${sm ? 'w-10 h-10' : 'w-20 h-20'}`}>
        <img
          src={src}
          alt='test'
          className='w-full h-full object-cover'
        />
      </div>
    </>
  )
}
