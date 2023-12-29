// FINDING OTHER USERS OR REMOVE ME FROM USERS ARRAY!
export const findOtherUsers = users => {
  // CURRENT USER ID!
  const currentUserId = JSON.parse(localStorage.getItem('userData@**@user')).id

  // REMOVE CURRENT USER FROM USERS TRAY!
  const otherUsers = users.filter(user => user._id !== currentUserId)

  // RETURN OTHER USERS!
  return otherUsers
}

// GET MYSELF DATA FROM CHAT !!
// FINDING OTHER USERS OR REMOVE ME FROM USERS ARRAY!
export const findMySelf = users => {
  // CURRENT USER ID!
  const currentUserId = JSON.parse(localStorage.getItem('userData@**@user')).id

  // REMOVE CURRENT USER FROM USERS TRAY!
  const myself = users.filter(user => user._id === currentUserId)

  // RETURN OTHER USERS!
  return myself
}

