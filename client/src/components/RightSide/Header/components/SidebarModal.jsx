import { useSelector } from 'react-redux'
import { findOtherUsers } from '../../../../utils/otherUsers'
import SingleUserInfo from './SingleUserInfo'
import GroupInfo from './GroupInfo'

export default function SidebarModal ({ closeModal, open }) {
  const activeChat = useSelector(state => state.chat.activeConversationInfo)

  const isGroupChat = activeChat?.group

  const isBlocked = () => {
    // CHECKING FOR THE BLOCKED USERS!
    if (
      JSON.parse(localStorage.getItem('userData@**@user'))?.blockedList
        ?.length > 0
    ) {
      // FINDING OTHER USERS!
      const users = findOtherUsers(activeChat?.users)

      // GETTING BLOCKED LIST FROM THE LOCAL STORAGE!!
      const blockedList = JSON.parse(
        localStorage.getItem('userData@**@user')
      )?.blockedList

      // CHECKING IF THE OTHER USER IS IN THE BLOCKED LIST!
      return blockedList?.includes(users[0]?._id)
    }
  }

  return (
    <>
      <div
        onClick={closeModal}
        className={`bg-black/50 fixed left-0 z-[999] right-0 top-0 bottom-0 transition-all duration-500 backdrop-blur-sm ${
          open ? ' visible opacity-1 ' : ' hidden opacity-0 '
        }`}
      />
      <div
        className={`w-[25vw] h-screen bg-[#272829] z-[9999] fixed right-0 transition duration-500 
        ${open ? '  !text-red-500' : '  translate-x-[25vw]  '}
        `}
      >
        {/* BODY!! */}
        <section className='text-white text-2xl font-semibold h-screen overflow-auto no-scrollbar pb-6 '>
          {/* WILL ONLY SHOW IF THE CONVERSATION IS OF TYPE ONE TO ONE CHAT! */}
          {!isGroupChat && (
            <SingleUserInfo
              activeChat={activeChat}
              isGroupChat={isGroupChat}
              isBlocked={isBlocked()}
            />
          )}

          {/* WILL ONLY SHOW IF THE CONVERSATION IS OF TYPE MANY TO MANY CHAT!! */}
          {isGroupChat && <GroupInfo activeChat={activeChat} />}
        </section>
      </div>
    </>
  )
}
