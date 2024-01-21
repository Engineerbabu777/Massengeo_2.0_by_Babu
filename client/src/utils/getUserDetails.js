export const userDetails = {
  username: JSON.parse(localStorage.getItem('userData@**@user'))?.username,
  email: JSON.parse(localStorage.getItem('userData@**@user'))?.email,
  avatar:
    JSON.parse(localStorage.getItem('userData@**@user'))?.image ||
    'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png',
  about:
    JSON.parse(localStorage.getItem('userData@**@user'))?.about ||
    'I am a software developer from New York who is passionate about creating innovative solutions.',
  blockedList:
    JSON.parse(localStorage.getItem('userData@**@user'))?.blockedList || [],
  id: 
  JSON.parse(localStorage.getItem('userData@**@user'))?.id || '',

}

export const getWholeUserDetails = JSON.parse(
  localStorage.getItem('userData@**@user')
)

export const updateUserBlockedListInLocalStorage = (userId, action) => {
  console.log(userId, action)
  if (action === 'block') {
    // add to the list!
    let updatedUserData = getWholeUserDetails; // PREVIOUS DATA IN VAR!
    updatedUserData.blockedList = [...updatedUserData.blockedList, userId] // SETTING UPDATED VALUE!
    localStorage.setItem('userData@**@user', JSON.stringify(updatedUserData)) // UPDATING IN LOCAL STORAGE!
  } else {
    // REMOVE FROM THE LIST!
    let updatedUserData = getWholeUserDetails // PREVIOUS DATA IN VAR!
    updatedUserData.blockedList = updatedUserData.blockedList.filter
      (item => item !== userId) // SETTING UPDATED VALUE!
    localStorage.setItem('userData@**@user', JSON.stringify(updatedUserData)) // UPDATING IN LOCAL STORAGE!
  }
}
