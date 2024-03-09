import React, { useEffect } from 'react'
import AddStory from './AddStoryModal/AddStory'
import { useSelector } from 'react-redux'
import useConversation from '../../../../hooks/useConversation'
import EachFriend from './components/EachFriend'

function StoriesParent () {
  const { fetchFriendsOfUserAsPerConversations } = useConversation()
  const { fetchingUserFriends, userFriends } = useSelector(state => state.user)

  console.log({ fetchingUserFriends, userFriends })

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
      <AddStory addStory />

      {/* MAPPING OVER THE STORIES OF FRIENDS!! */}
      {userFriends?.length > 0 && userFriends?.map(user => (
        <EachFriend user={user} />
      ))}
    </div>
  )
}

export default StoriesParent
