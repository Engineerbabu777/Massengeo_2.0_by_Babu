import React, { useEffect, useState } from 'react'
import {
  FaMicrophone,
  IoIosSend,
  MdOutlineEmojiEmotions,
  MdAttachFile
} from '../../../icons'
import useMessages from '../../../hooks/useMessages'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  updateEditMessageId,
  updateEditedMode,
  updateFooterInput
} from '../../../redux/chatSlice'
import { findOtherUsers } from '../../../utils/otherUsers'
import BlockedUserDisplay from './components/BlockedUserDisplay'
import { userDetails } from '../../../utils/getUserDetails'
import { socket } from '../Messages/Messages'
import { fileIconOptions } from '../../../constants'

const Footer = () => {
  const { sendMessages, updateMessage } = useMessages()
  const [messageType, setMessageType] = useState('text')
  const { conversationId } = useParams()
  const inputValueEdit = useSelector(state => state.chat.footerInput)
  const editMode = useSelector(state => state.chat.inputUpdateState)
  const messageId = useSelector(state => state.chat.messageId)
  const activeChatInfo = useSelector(state => state.chat.activeConversationInfo)
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()

  // console.log((JSON.parse(localStorage.getItem('userData@**@user'))).blockedList);

  useEffect(() => {
    if (inputValueEdit) {
      setInput(inputValueEdit)
      dispatch(updateFooterInput(''))
      dispatch(updateEditedMode(true))
    }
  }, [inputValueEdit])

  const handleMessages = () => {
    if (input && conversationId && !editMode) {
      sendMessages(messageType, input, conversationId)
      setInput('')

      return
    }

    if (input && conversationId && editMode && messageId) {
      updateMessage(messageType, input, messageId, conversationId)
      dispatch(updateEditedMode(false))
      dispatch(updateEditMessageId(null))
      setInput('')

      return
    }
  }

  // CHECKING FOR THE BLOCKED USERS!
  if (
    JSON.parse(localStorage.getItem('userData@**@user'))?.blockedList?.length >
      0 ||
    findOtherUsers(activeChatInfo?.users)[0]?.blockedList?.length > 0
  ) {
    // FINDING OTHER USERS!
    const users = findOtherUsers(activeChatInfo?.users)

    // GETTING BLOCKED LIST FROM THE LOCAL STORAGE!!
    const blockedList = JSON.parse(
      localStorage.getItem('userData@**@user')
    )?.blockedList

    // IN MY BLOCKED LIST ( CURRENTLY LOGGED USER! )
    const isIncludedInMyBlockedList = blockedList?.includes(users[0]?._id)
    // IN OTHERS BLOCKED LIST ( WHOSE CHAT WE ARE VIEWING )!
    const isIncludedInOthersBlockedList = users[0]?.blockedList.includes(
      userDetails.id
    )

    // CHECKING IF THE OTHER USER IS BLOCKED FROM ANY SIDE!
    const isBlocked = isIncludedInMyBlockedList || isIncludedInOthersBlockedList

    // DISPLAY BLOCKAGE MESSAGE!
    if (isBlocked) {
      return (
        <BlockedUserDisplay
          blockedByMe={isIncludedInMyBlockedList ? true : false}
        />
      )
    }
  }

  const handleChangeInput = event => {
    setInput(event.target.value)
    let timeout
    clearTimeout(timeout)
    // FOR NOW WE WILL ONLY CREATE FOR SINGLE CHAT!
    socket.emit('user-is-typing', {
      chatId: activeChatInfo._id,
      userId: userDetails.id,
      message: event.target.value
    })

    timeout = setTimeout(() => {
      // REMOVE THAT CHATTING!
      socket.emit('user-stopped-typing', socket.id)
      console.log('this user has stopped typing...')
    }, 3000)
  }

  return (
    <div className=' mb-4 mx-5 flex gap-3'>
      <section className='flex border-2 border-gray-800 rounded-lg p-3 flex-1 relative'>
        {open && (
          <div className='border-2 border-white rounded-md z-[9999] gap-2 flex flex-col w-[150px] bg-[#0c0415] absolute bottom-12 left-0'>
            {fileIconOptions.map(({ name, Icon }) => (
              <p className='text-gray-400 font-semibold flex gap-2 p-2 hover:text-white cursor-pointer'>
                {/* ICON! */}
                <Icon className='w-6 h-6' />
                {/* TEXT! */}
                {name}
              </p>
            ))}
          </div>
        )}
        {/* FILE ICON */}
        <MdAttachFile
          className='text-gray-500 w-8 h-8 cursor-pointer'
          onClick={() => setOpen(!open)}
        />

        {/* INPUT */}
        <input
          type='text'
          placeholder='Type a message...'
          className='flex-1 px-2 py-1 bg-inherit border-none outline-none text-white font-semibold text-lg'
          value={input}
          onChange={handleChangeInput}
        />

        {/* EMOJI ICON */}
        <MdOutlineEmojiEmotions className='text-gray-500 w-8 h-8 cursor-pointer' />

        {/* MICROPHONE */}
        <FaMicrophone className='text-gray-500 w-8 h-8 ml-3 cursor-pointer' />
      </section>

      <button onClick={handleMessages} className='p-2 rounded-md bg-[#F05454]'>
        <IoIosSend className='w-10 h-10 text-white' />
      </button>
    </div>
  )
}

export default Footer
