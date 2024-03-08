import { MdClose } from 'react-icons/md'
import { IoMdColorPalette } from 'react-icons/io'
import { MdOutlineBorderColor } from 'react-icons/md'
import { IoIosSend } from 'react-icons/io'
import { useState } from 'react'
import { IoMdImages } from "react-icons/io";

export default function AddStoryModal ({ open, handleClose }) {
  const [bgColor, setBgColor] = useState('#000444')
  const [textFont, setTextFont] = useState('Arial')

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    setBgColor(color)
  }

//   SOME THING TEXT!

  const getRandomFont = () => {
    const fonts = [
      'Arial, sans-serif',
      'Times New Roman, serif',
      'Courier New, monospace',
      'Verdana, sans-serif',
      'Georgia, serif',
      'Comic Sans MS, cursive'
    ]

    const randomIndex = Math.floor(Math.random() * fonts.length)
    setTextFont(fonts[randomIndex])
  }

  console.log({ bgColor: `${bgColor}` })

  return (
    <>
      <div
        // onClick={handleClose}
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
            <div className='h-10 w-10 rounded-full bg-white/50 absolute hover:bg-white/70 cursor-pointer flex items-center justify-center top-1 left-1'>
              <MdClose
                className='w-6 h-6 text-red-500 '
                onClick={handleClose}
              />
            </div>

            {/* MAIN */}
            <div
              contentEditable
              className='w-full h-full outline-none text-center flex items-center justify-center text-2xl'
              style={{ fontFamily: textFont }}
            ></div>

            {/* FOOTER! */}
            <footer className='flex items-center justify-between px-2 mt-auto p-2'>
              {/* OPTIONS! */}
              <section className='flex gap-2 items-center'>
                <div
                  onClick={getRandomColor}
                  className='h-10 w-10 rounded-full bg-white/50 hover:bg-white/70 cursor-pointer flex items-center justify-center '
                >
                  <IoMdColorPalette className='text-[#F05454] w-8 h-8' />
                </div>
                <div
                  onClick={getRandomFont}
                  className='h-10 w-10 rounded-full bg-white/50 hover:bg-white/70 cursor-pointer flex items-center justify-center '
                >
                  <span className='text-[#F05454] text-2xl'>B</span>
                </div>
                <label
                  className='h-10 w-10 rounded-full bg-white/50 hover:bg-white/70 cursor-pointer flex items-center justify-center '
                >
                    <IoMdImages className='w-8 h-8 text-[#F05454]'/>
                    <input type="file" className="hidden"/>
                </label>
              </section>

              {/* BUTTON! */}
              <button className='flex items-center hover:bg-opacity-70 justify-center h-[40px] gap-1 px-2 rounded-md text-2xl  bg-[#F05454] text-white '>
                Send <IoIosSend className='w-6 h-6' />
              </button>
            </footer>
          </section>
        )}
      </div>
    </>
  )
}
