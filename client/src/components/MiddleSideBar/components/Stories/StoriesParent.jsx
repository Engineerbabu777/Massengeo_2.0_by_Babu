import React, { useEffect } from 'react'
import AddStory from './AddStoryModal/AddStory'
import { useSelector } from 'react-redux'
import useConversation from '../../../../hooks/useConversation'
import EachFriend from './components/EachFriend'

function StoriesParent () {
  const { fetchFriendsOfUserAsPerConversations } = useConversation()
  const { fetchingUserFriends, userFriends, currentUser, fetchingCurrentUser } =
    useSelector(state => state.user)
  const { conversations } = useSelector(state => state.chat)

  console.log({ fetchingUserFriends, userFriends, currentUser })

  const fetchUserFriends = async () => {
    await fetchFriendsOfUserAsPerConversations()
  }

  useEffect(() => {
    fetchUserFriends() // WILL FETCH FRIENDS WHEN COMPONENT MOUNT/ FPRINTS ON THE SCREEN!
  }, [])

  return (
    <div className='mx-auto w-[95%] mt-10 flex gap-8 no-scrollbar overflow-auto'>
      {/* OPTION TO SHARE MY STORY! */}
      {/* ADD STORY! */}
      <AddStory user={currentUser} />

      {/* MAPPING OVER THE STORIES OF FRIENDS!! */}
      {userFriends?.length > 0 &&
        userFriends?.map(user => {
          return (
            <EachFriend
              user={user}
              conversationId={
                conversations.filter(
                  c =>
                    c?.users?.length === 2 &&
                    !c.group &&
                    c.users.some(u => u._id === user._id)
                )[0]?._id
              }
            />
          )
        })}
    </div>
  )
}

export default StoriesParent
