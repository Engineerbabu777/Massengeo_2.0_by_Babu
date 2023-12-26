import { useEffect } from 'react'
import ChatSection from './components/Chats/ChatSection'
import Header from './components/Header'
import StoriesParent from './components/Stories/StoriesParent'
import useUser from '../../hooks/useUser'
import { useSelector } from 'react-redux'

export default function MiddleSideBar ({}) {
  const { getAllUsers } = useUser()
  const users = useSelector(state => state.user.users)

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <>
      <aside className='bg-[#0c0415] w-[25vw] h-screen pt-6 border-r-2 border-gray-700 '>
        {/* HEADER! */}
        <Header />

        {/* STORIES! */}
        <StoriesParent />

        {/* CHAT SECTION! */}
        <ChatSection  />
      </aside>
    </>
  )
}
