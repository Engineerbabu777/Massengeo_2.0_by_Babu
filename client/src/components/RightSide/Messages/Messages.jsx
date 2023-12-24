import React, { useEffect, useRef } from 'react'
import { marsConversation } from '../../../constants'
import SingleMessage from './components/SingleMessage'

const Messages = () => {
  const refVal = useRef(null)

  const scrollToBottom = () => {
    refVal.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [])
  return (
    <section className='flex-1 flex flex-col py-1 px-5 gap-6 h-[calc(100vh-270px)] pb-6 overflow-scroll no-scrollbar pt-4'>
      {marsConversation.map((message, ind) => (
        <SingleMessage message={message} ind={ind} />
      ))}
      <div className='text-red-500' ref={refVal} />
    </section>
  )
}

export default Messages
