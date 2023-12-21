import ChatSection from './components/Chats/ChatSection'
import Header from './components/Header'
import StoriesParent from './components/Stories/StoriesParent'

export default function MiddleSideBar ({}) {
  return (
    <>
      <aside className='bg-[#0c0415] w-[25vw] h-screen pt-6 border-r-2 border-gray-700 '>
        {/* HEADER! */}
        <Header />

        {/* STORIES! */}
        <StoriesParent />

        {/* CHAT SECTION! */}
        <ChatSection />

      </aside>
    </>
  )
}
