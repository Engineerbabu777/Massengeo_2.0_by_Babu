import { MdClose, MdDelete } from 'react-icons/md'
import { IoMdColorPalette } from 'react-icons/io'
import { IoIosSend } from 'react-icons/io'
import { useState } from 'react'
import { IoMdImages } from 'react-icons/io'
import { uploadImageToCloudinary } from '../../../../utils/uploadImageToCloudinary'
import { MdFormatColorText } from "react-icons/md";
import useStories from '../../../../hooks/useStories'
import toast from 'react-hot-toast';

export default function AddStoryModal ({ open, handleClose }) {
  const [bgColor, setBgColor] = useState('#aaa6b2')
  const [textFont, setTextFont] = useState('Arial')
  const [statusImage, setStatusImage] = useState('')
  const [textColor, setTextColor] = useState('#FFFFFF')
  const {createStories} = useStories();

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    setBgColor(color)
  }

  const getRandomTextColor =() =>{
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    setTextColor(color) 
  }

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

  const getImage = async event => {
    const image = await uploadImageToCloudinary(event)
    setStatusImage(image?.secure_url)
  }


  const handleSubmit = () => {
    if(statusImage){
      // SEND IMAGE STORY!
      createStories("image",statusImage)
    }else{
      const text = document.getElementById("storyText").innerText.trim();
      if(text.length <0 || text.length > 100){
        toast.error("invalid character length");
        return;
      }
      // SEND TEXT STORY!
      const data = {
        backgroundColor:bgColor,
        fontFamily:textFont,
        storyText: text,
        textColor:textColor
      }
      createStories("text",data)
    }
  }

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
            <div className='h-10 w-10 rounded-full bg-white/50 absolute hover:bg-white/70 cursor-pointer flex items-center justify-center top-1 left-1'>
              <MdClose
                className='w-6 h-6 text-red-500 '
                onClick={handleClose}
              />
            </div>

            {/* MAIN */}
            {!statusImage && (
              <div
                id='storyText'
                contentEditable
                className='w-full h-full outline-none text-center flex items-center flex-col justify-center text-2xl'
                style={{ fontFamily: textFont,color:textColor }}
              >
                &nbsp;
              </div>
            )}

            {statusImage && (
              <div className='flex-1 flex w-full h-full'>
                <div
                  onClick={() => {setStatusImage('')}}
                  className='h-10 w-10 rounded-full bg-white/50 hover:bg-white/70 absolute right-2 top-2 cursor-pointer flex items-center justify-center '
                >
                  <MdDelete className='text-[#F05454] w-6 h-6 hover:h-8 hover:w-8 transition duration-300' />
                </div>
                <img
                  src={statusImage}
                  className='w-full h-[400px]'
                  alt='text'
                />
              </div>
            )}

            {/* FOOTER! */}
            <footer className='flex items-center justify-between px-2 p-2 absolute bottom-0 left-0 right-0 '>
             
              {/* OPTIONS(ONLY IF TEXT)! */}
              {!statusImage && <section className='flex gap-2 items-center'>
                <div
                  onClick={getRandomColor}
                  className='h-10 w-10 rounded-full bg-white/50 hover:bg-white/70 cursor-pointer flex items-center justify-center '
                >
                  <IoMdColorPalette className='text-[#F05454] w-8 h-8' />
                </div>
                <div
                  onClick={getRandomTextColor}
                  className='h-10 w-10 rounded-full bg-white/50 hover:bg-white/70 cursor-pointer flex items-center justify-center '
                >
                  <MdFormatColorText className='text-[#F05454] w-8 h-8' />
                </div>
                <div
                  onClick={getRandomFont}
                  className='h-10 w-10 rounded-full bg-white/50 hover:bg-white/70 cursor-pointer flex items-center justify-center '
                >
                  <span className='text-[#F05454] text-3xl' style={{fontFamily:textFont}}>T</span>
                </div>
                <label className='h-10 w-10 rounded-full bg-white/50 hover:bg-white/70 cursor-pointer flex items-center justify-center '>
                  <IoMdImages className='w-8 h-8 text-[#F05454]' />
                  <input type='file' className='hidden' onChange={getImage} />
                </label>
              </section>}

              {/* TEXT AREA FOR JUST IMAGE CAPTION! */}
              {statusImage && <input type="text" placeholder='Type Caption For Your Story... ' className='flex-1 px-2 py-1.5 rounded-md border-none outline-none text-gray-300 font-semibold text-lg bg-black/30 mr-1'/>}

              {/* BUTTON! */}
              <button onClick={handleSubmit} className='flex items-center hover:bg-opacity-70 justify-center h-[40px] gap-1 px-2 rounded-md text-2xl  bg-[#F05454] text-white '>
                Send <IoIosSend className='w-6 h-6' />
              </button>
            </footer>
          </section>
        )}
      </div>
    </>
  )
}
