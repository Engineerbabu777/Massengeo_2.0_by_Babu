import { useEffect } from 'react'
import ChatSection from './components/Chats/ChatSection'
import Header from './components/Header'
import StoriesParent from './components/Stories/StoriesParent'
import useUser from '../../hooks/useUser'
import { useSelector } from 'react-redux'
import SearchUsers from './components/SearchUsers/SearchUsers'

export default function MiddleSideBar ({}) {
  const sidebarState = useSelector(state => state.sidebar.active)

  return (
    <>
      <aside className='bg-[#0c0415] w-[25vw] h-screen pt-6 border-r-2 border-gray-700 '>
        {/* IF ACTIVE STATE IS CHAT! */}
        {sidebarState === 'chats' && (
          <>
            {/* HEADER! */}
            <Header />

            {/* STORIES! */}
            <StoriesParent />

            {/* CHAT SECTION! */}
            <ChatSection />
          </>
        )}

        {/* IF ACTIVE STATE IS SEARCH FOR USERS! */}
        {sidebarState === 'users' && (
          <>
            <SearchUsers />
          </>
        )}

        {/* NOTIFICATIONS!! */}

        {/* SETTINGS! */}
      </aside>
    </>
  )
}
