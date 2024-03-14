


import React from 'react'
import SingleStory from '../SingleStory'

function EachFriend({user}) {
 // USER STATUS AVAILABLE!
 const isStatusAvailable = user?.stories?.length === 0
 if (isStatusAvailable) return null // IF USER STATUS NOT AVAILABLE!

 // CHECK STORY TIME!
 const isExpired = user.stories[0].createdAt;
 console.log({isExpired: new Date(isExpired)})


 return <SingleStory user={user} />
}

export default EachFriend