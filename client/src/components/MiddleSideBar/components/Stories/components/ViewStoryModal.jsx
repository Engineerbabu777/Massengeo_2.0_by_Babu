import { MdClose, MdDelete } from 'react-icons/md'
import { useState,useEffect } from 'react'

export default function ViewStoryModal ({ open, handleClose, data,value=10 }) {
  const [bgColor, setBgColor] = useState(data?.backgroundColor)
  const [textFont, setTextFont] = useState(data?.fontFamily)
  const [statusImage, setStatusImage] = useState(data?.statusImage || '')
  const [textColor, setTextColor] = useState(data?.textColor)
  const [time, setTime] = useState(value);
  
  console.log({data})
  
  useEffect(() => {
    const timeout = setInterval(() => {
      setTime(prev => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    if(time<1){
        handleClose()
    }
  
    return () => clearInterval(timeout);
  }, [time]);

  const handleSubmit = () => {}

  return (
    <>
      <div
        className={`bg-black/50 fixed flex items-center justify-center left-0 z-[999] right-0 top-0 bottom-0 transition-all duration-500 backdrop-blur-sm ${
          open ? ' visible opacity-1 ' : ' hidden opacity-0 '
        }`}
      >
        {open && (
          <section
            className={`w-full md:max-w-2xl rounded-md h-[400px]  flex-col flex relative `}
            style={{ backgroundColor: bgColor }}
          >
            {/* HEADER! */}
            <div className="w-full flex items-center absolute justify-between p-1">
            <div className='h-10 w-10 rounded-full bg-white/50 hover:bg-white/70 cursor-pointer flex items-center justify-center '>
              <MdClose
                className='w-6 h-6 text-red-500 '
                onClick={handleClose}
              />
           
            </div>
                    {/* TIME! */}
          
            <div className="rounded-full w-10 h-10 bg-white/50 border-2 border-neutral-300 text-xl flex items-center justify-center p-2 ml-auto text-black-500">
              {time}
              </div>
            </div>
            

       
     
            {/* MAIN */}
            {data?.storyType === 'text' && (
              <div
                id='storyText'
                className='w-full h-full outline-none text-center flex items-center justify-center text-2xl'
                style={{ fontFamily: textFont, color: textColor }}
              >
              {data?.storyText}
              </div>
            )}

            {data?.storyType === 'image' && (
              <div className='flex-1 flex w-full h-full'>
                <img
                  data-twe-lazy-load-init
                  src={statusImage}
                  className='w-full h-[400px]'
                  alt='text'
                />
              </div>
            )}

            {/* FOOTER! */}
            <footer className='flex items-center justify-between px-2 p-2 absolute bottom-0 left-0 right-0 '></footer>
          </section>
        )}
      </div>
    </>
  )
}
