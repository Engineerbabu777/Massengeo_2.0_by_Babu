import { MdClose, MdDelete } from 'react-icons/md'
import { useState, useEffect } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import Avatar from '../../../../RightSide/Header/components/Avatar'
import moment from 'moment'
import { IoIosArrowUp, IoIosSend } from 'react-icons/io'
import useMessages from '../../../../../hooks/useMessages'

export default function ViewStoryModal ({
  open,
  handleClose,
  data,
  value = 10,
  userData,
  conversationId,
  isMyStory = false
}) {
  const [bgColor, setBgColor] = useState(data?.backgroundColor)
  const [textFont, setTextFont] = useState(data?.fontFamily)
  const [statusImage, setStatusImage] = useState(data?.statusImage || '')
  const [textColor, setTextColor] = useState(data?.textColor)
  const [time, setTime] = useState(value)
  const [percentage, setPercentage] = useState(0)
  const [isReplyModeOpen, setIsReplyModeOpen] = useState(false)
  const [storyReply, setStoryReply] = useState("");

  const {sendMessages} = useMessages();

  useEffect(() => {
    const timeout = setInterval(() => {
      setPercentage(prev => {
        if (prev < 100) {
          if (isReplyModeOpen) return prev
          return prev + 1
        } else {
          return prev
        }
      })
    }, 70)

    if (percentage === 100) {
      handleClose()
    }

    return () => clearInterval(timeout)
  }, [percentage,isReplyModeOpen])

  const handleChange = (e) => {
    setStoryReply(e.target.value);
  }

  const handleSendReply = async() => {
    const storyData = {
      isStoryReply: true,
      _id:data?._id,
    }
    await sendMessages("text", storyData,conversationId,true)
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
            className={`w-full md:max-w-2xl rounded-md h-[500px]  flex-col flex relative overflow-hidden `}
            style={{ backgroundColor: bgColor }}
          >
            {/* HEADER! */}
            <div className='flex flex-col absolute w-full overflow-hidden'>
              <div className='w-full flex items-center justify-between p-1 bg-black/40'>
                {/*  */}
                <div className='flex gap-3'>
                  {/* BACK! */}
                  <div className=' cursor-pointer flex items-center justify-center '>
                    <FaArrowLeftLong
                      className='w-6 h-6 text-white '
                      onClick={handleClose}
                    />
                  </div>
                  {/* NAME! */}
                  <div className={'flex gap-2 text-white'}>
                    <div className=''>
                      <Avatar src={userData?.avatar} sm />
                    </div>
                    <div className='flex flex-col'>
                      <span className='font-semibold text-md'>
                        {userData?.username}
                      </span>
                      <span className='text-gray-300 text-sm'>
                        {moment(new Date(data?.createdAt)).format(
                          'MMMM Do YYYY, h:mm:ss a'
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* TIME! */}
              </div>
              <div
                className={'bg-green-500/70 h-1 transition duration-300'}
                style={{ width: `${percentage}%` }}
              />
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
              <div className='flex-1 flex w-full h-full flex-col overflow-hidden'>
                <img
                  data-twe-lazy-load-init
                  src={statusImage}
                  className='w-full h-[400px]'
                  alt='text'
                />
                {data?.storyText && (
                  <p className='w-full p-2 rounded-b-md flex items-center justify-between p-1 bg-black/80 text-gray-400 font-semibold z-[999]'>
                    {data?.storyText}
                  </p>
                )}
              </div>
            )}

            {/* FOOTER! */}
            {!isMyStory && (
              <footer className='flex text-red-500 bg-white-20 text-xl items-center justify-center px-2 p-2 absolute bottom-0 left-0 right-0 w-full flex flex-col gap-1'>
                <div
                  onClick={() => setIsReplyModeOpen(!isReplyModeOpen)}
                  className='flex items-center rounded-full justify-center h-6 w-6 bg-gray-500/40 text-black cursor-pointer hover:bg-gray-500/20'
                >
                  <IoIosArrowUp
                    className={`h-5 w-5 transition-all duration-300 ${
                      isReplyModeOpen ? '-rotate-180' : ''
                    }`}
                  />
                </div>
                {isReplyModeOpen ? (
                  <div className='flex gap-1 w-full'>
                    <input
                      type='text'
                      placeholder='Type a reply...'
                      className='flex-1 px-2 py-1 bg-black/50 rounded-md w-full border-none outline-none text-white font-semibold text-lg'
                      value={storyReply}
                      onChange={handleChange}
                    />
                    <button
                      onClick={handleSendReply}
                      className='py-2 px-4 text-white flex items-center justify-center rounded-md group bg-[#F05454]'
                    >
                      <span className=''>Reply</span>
                    </button>
                  </div>
                ) : (
                  <span
                    onClick={() => setIsReplyModeOpen(true)}
                    className='text-gray-500 bg-white/60 px-4 py-2 text-sm font-semibold italic  rounded-full hover:bg-white cursor-pointer'
                  >
                    Reply to {userData?.username}
                  </span>
                )}
              </footer>
            )}
          </section>
        )}
      </div>
    </>
  )
}
