import { MdClose, MdEdit } from 'react-icons/md'
import { userDetails } from '../../../../utils/getUserDetails'
import { uploadImageToCloudinary } from '../../../../utils/uploadImageToCloudinary'
import { useSelector } from 'react-redux'

export default function GroupModalSettings ({ open, handleClose }) {
  const activeChat = useSelector(state => state.chat.activeConversationInfo)
  // UPLOAD IMAGE HANDLER!
  const onChangeImageHandler = async event => {
    const data = await uploadImageToCloudinary(event)
    // UPDATE THE AVATAR IN ACTIVE CHAT INFO!!
  }

  const onChangeInputHandler = e => {
    // UPDATE THE NAME IN ACTIVE CHAT INFO!!
  }

  return (
    <>
      <div
        // onClick={handleClose}
        className={`bg-black/50 fixed flex items-center justify-center left-0 z-[999] right-0 top-0 bottom-0 transition-all duration-500 backdrop-blur-sm ${
          open ? ' visible opacity-1 ' : ' hidden opacity-0 '
        }`}
      >
        {open && (
          <section className='w-full md:max-w-2xl bg-black border-2 border-gray-300 rounded-md'>
            {/* GROUP SETTINGS! */}

            {/* HEADER! */}
            <header className='flex justify-between items-center w-full border-b-2 border-gray-200 p-2'>
              <h2 className='text-2xl'>Group Settings</h2>
              <MdClose
                className='w-6 h-6 text-red-500 cursor-pointer'
                onClick={handleClose}
              />
            </header>

            {/* IMAGE SETTINGS! */}
            <section className='flex items-center flex-col p-2'>
              <div className='rounded-full w-[200px] h-[200px] relative border-2'>
                <img
                  src={activeChat.avatar}
                  alt='alt-text'
                  className='overflow-hidden w-full h-full rounded-full object-cover'
                />

                <label className='bg-[#007700] flex items-center justify-center w-12 h-12 rounded-full cursor-pointer absolute right-5 bottom-1 '>
                  <MdEdit className='w-8 h-8 text-white' />
                  <input
                    type='file'
                    className='hidden'
                    name='avatar'
                    onChange={onChangeImageHandler}
                  />
                </label>
              </div>

              <div className=''>
                <div className='flex flex-col gap-1'>
                  <label className='text-gray-500 text-2xl font-bold'>
                    Group Name:
                  </label>
                  <input
                    onChange={onChangeInputHandler}
                    value={activeChat.groupName}
                    placeholder='Enter group name....'
                    className='flex-1 px-4 py-2 bg-inherit rounded-md outline-none text-white font-semibold text-xl border-2 border-gray-700 w-[450px]'
                    name='groupName'
                    type='text'
                  />
                </div>
                {/* GROUP NAME SETTINGS! */}

                {/* GROUP MEMBERS SETTINGS! */}

                {/* GROUP ABOUT! */}

                {/* HANDLE SUBMIT BTN! */}
              </div>
            </section>
          </section>
        )}
      </div>
    </>
  )
}
