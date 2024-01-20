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

const Footer = () => {
  const { sendMessages, updateMessage } = useMessages()
  const [messageType, setMessageType] = useState('text')
  const { conversationId } = useParams()
  const inputValueEdit = useSelector(state => state.chat.footerInput)
  const editMode = useSelector(state => state.chat.inputUpdateState)
  const messageId = useSelector(state => state.chat.messageId)
  const activeChatInfo = useSelector(state => state.chat.activeConversationInfo)
  const [input, setInput] = useState('')
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

  if (JSON.parse(localStorage.getItem('userData@**@user'))?.blockedList.length>0) {
    console.log('hi')
    const users = findOtherUsers(activeChatInfo?.users)
    console.log(users[0]?._id)

    const blockedList = JSON.parse(
      localStorage.getItem('userData@**@user')
    )?.blockedList
    console.log(blockedList)

    const isBlocked = blockedList?.includes(users[0]?._id)
    if (isBlocked) {
      return <>you have blocked this user!</>
    }
  }

  return (
    <div className=' mb-4 mx-5 flex gap-3'>
      <section className='flex border-2 border-gray-800 rounded-lg p-3 flex-1'>
        {/* FILE ICON */}
        <MdAttachFile className='text-gray-500 w-8 h-8 cursor-pointer' />

        {/* INPUT */}
        <input
          type='text'
          placeholder='Type a message...'
          className='flex-1 px-2 py-1 bg-inherit border-none outline-none text-white font-semibold text-lg'
          value={input}
          onChange={e => setInput(e.target.value)}
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
