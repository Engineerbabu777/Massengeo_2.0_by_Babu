import { MdClose, MdEdit } from 'react-icons/md'
import { userDetails } from '../../../../utils/getUserDetails'
import { uploadImageToCloudinary } from '../../../../utils/uploadImageToCloudinary'
import { useSelector } from 'react-redux'
import { findMySelf, findOtherUsers } from '../../../../utils/otherUsers'
import { useState } from 'react'
import { FaCheck } from 'react-icons/fa'
import useGroup from '../../../../hooks/useGroup'

export default function GroupModalSettings ({ open, handleClose }) {
  const activeChat = useSelector(state => state.chat.activeConversationInfo)
  const { removeGroupMember, updateGroupData } = useGroup()

  const [newImage, setNewImage] = useState({
    isNew: false,
    value: activeChat?.avatar
  })
  const [groupName, setGroupName] = useState({
    isNew: false,
    value: activeChat?.groupName
  })
  const [about, setAbout] = useState({
    isNew: false,
    value: activeChat?.about
  })
  // UPLOAD IMAGE HANDLER!
  const onChangeImageHandler = async event => {
    const data = await uploadImageToCloudinary(event)
    // UPDATE THE AVATAR IN ACTIVE CHAT INFO!!
    setNewImage({
      isNew: true,
      value: data.secure_url
    })
  }

  // INPUT HANDLER!
  const onChangeInputHandler = e => {
    // UPDATE THE NAME IN ACTIVE CHAT INFO!!
    if (e.target.name === 'groupName') {
      setGroupName({
        isNew: true,
        value: e.target.value
      })
    } else {
      setAbout({
        isNew: true,
        value: e.target.value
      })
    }
  }

  // UPDATE HANDLER!
  const updateHandler = async (data, id, type) => {
    await updateGroupData(data, id, type, handleClose)
    setTimeout(() => {
      setAbout({
        isNew: false,
        value:about.value
      })
      setNewImage({
        isNew: false,
        value:newImage.value
      })
      setGroupName({
        isNew: false,
        value:groupName.value
      })
    }, 2000)
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
            <section className='flex items-center flex-col p-2 '>
              <div className='rounded-full w-[200px] h-[200px] relative border-2'>
                <img
                  src={newImage.value}
                  alt='alt-text'
                  className='overflow-hidden w-full h-full rounded-full object-cover'
                />

                <label className='bg-[#007700] flex items-center justify-center w-12 h-12 rounded-full cursor-pointer absolute right-5 bottom-1 '>
                  {!newImage?.isNew && (
                    <MdEdit className='w-8 h-8 text-white' />
                  )}
                  {newImage?.isNew && (
                    <FaCheck
                      className='w-8 h-8 text-white'
                      onClick={() =>
                        updateHandler(newImage, activeChat._id, 'avatar')
                      }
                    />
                  )}
                  <input
                    type='file'
                    className='hidden'
                    name='avatar'
                    onChange={onChangeImageHandler}
                  />
                </label>
              </div>

              <div className='w-full flex flex-col gap-3'>
                {/* GROUP NAME SETTINGS! */}
                <div className='flex flex-col gap-1 w-full relative'>
                  <label className='text-gray-500 text-2xl font-bold'>
                    Group Name:
                  </label>
                  <input
                    onChange={onChangeInputHandler}
                    placeholder='Enter group name....'
                    className='flex-1 px-4 py-2 bg-inherit rounded-md outline-none text-white font-semibold text-xl border-2 border-gray-700 grow-1'
                    name='groupName'
                    type='text'
                    value={groupName.value}
                  />
                  {groupName?.isNew && (
                    <FaCheck
                      onClick={() =>
                        updateHandler(groupName, activeChat._id, 'groupName')
                      }
                      className='w-8 h-8 text-blue-500 absolute right-1 cursor-pointer'
                    />
                  )}
                </div>

                {/* GROUP MEMBERS SETTINGS! */}
                <span className='text-gray-500 text-2xl'>Group Members</span>
                <section className='grid grid-cols-2 gap-2 '>
                  {findMySelf(activeChat?.users).map(u => (
                    <div
                      className={`py-1 flex items-center gap-2 bg-slate-800/50 border-gray-700 border p-1
                `}
                    >
                      <img
                        src={u.avatar}
                        alt='alt-text'
                        className='overflow-hidden w-16 h-16 rounded-full object-cover'
                      />
                      <p className='font-bold text-white text-xl grow line-clamp-1 max-w-full'>
                        You ( Admin🔐 )
                      </p>
                   
                    </div>
                  ))}

                  {findOtherUsers(activeChat?.users)?.map((u, i) => (
                    <>
                      <div
                        className={`py-1 flex items-center justify-between gap-2 bg-slate-800/50 border-gray-700 border p-1
                `}
                      >
                        <img
                          src={u.avatar}
                          alt='alt-text'
                          className='overflow-hidden w-16 h-16 rounded-full object-cover'
                        />
                        <p className='font-bold text-white text-xl grow line-clamp-1 max-w-[50%]'>
                          {u.username}
                        </p>
                        <button onClick={() => {}} className='bg-[#F05454] hover:opacity-50 rounded-md p-1 text-white cursor-pointer font-normal text-lg'>
                          kick out
                        </button>
                      </div>
                    </>
                  ))}
                </section>

                {/* GROUP ABOUT! */}
                <div className='flex flex-col gap-1'>
                  <div className='relative flex items-center justify-between'>
                    <label className='text-gray-500 text-2xl font-bold'>
                      Group Name:
                    </label>
                    {about?.isNew && (
                      <FaCheck
                        className='w-4 h-4 text-white cursor-pointer'
                        onClick={() =>
                          updateHandler(about, activeChat._id, 'about')
                        }
                      />
                    )}
                  </div>

                  <textarea
                    onChange={onChangeInputHandler}
                    rows={4}
                    value={about.value}
                    placeholder='Enter group about....'
                    name='about'
                    type='text'
                    className=' resize-none flex-1 px-4 py-2 bg-inherit rounded-md outline-none text-white font-semibold text-xl border-2 border-gray-700 w-full'
                  />
                </div>
              </div>
            </section>
          </section>
        )}
      </div>
    </>
  )
}
