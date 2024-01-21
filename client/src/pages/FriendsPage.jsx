import React, { useEffect } from 'react'
import useConversation from '../hooks/useConversation'
import { useSelector } from 'react-redux'
import SingleComponent from '../components/Settings/Blocked/SingleComponent'

const FriendsPage = () => {
  const { fetchFriendsOfUserAsPerConversations } = useConversation()
  const friends = useSelector(state => state.user.userFriends)
  useEffect(() => {
    const fetchBlockedUsers = async () => {
      await fetchFriendsOfUserAsPerConversations()
    }
    fetchBlockedUsers()
  }, [])
  return (
    <div className='bg-[#0c0415] h-screen flex-1 flex flex-col p-5'>
      {/* HEADER! */}
      <h1 className='text-3xl text-white font-bold tracking-wider '>
        User Friends Based on Conversations
      </h1>

      {/* GRIDS AT LEAST 5 ON THIS SCREEN! */}
      <section className='grid grid-cols-4 gap-4 mt-12'>
        {friends?.length > 0 &&
          friends?.map((user, index) => (
            <>
              <SingleComponent
                username={user?.username}
                avatar={user?.avatar}
                friends
              />
            </>
          ))}
      </section>
    </div>
  )
}

export default FriendsPage
