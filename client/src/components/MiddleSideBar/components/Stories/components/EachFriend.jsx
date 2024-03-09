


import React from 'react'
import SingleStory from '../SingleStory'

function EachFriend({user}) {
 // USER STATUS AVAILABLE!
 const isStatusAvailable = user?.stories?.length === 0
 if (isStatusAvailable) return null // IF USER STATUS NOT AVAILABLE!

 return <SingleStory user={user} />
}

export default EachFriend