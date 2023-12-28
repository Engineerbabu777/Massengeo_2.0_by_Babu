// FINDING OTHER USERS OR REMOVE ME FROM USERS ARRAY!
export const findOtherUsers = users => {
  // CURRENT USER ID!
  const currentUserId = JSON.parse(localStorage.getItem('userData@**@user'))._id

  // REMOVE CURRENT USER FROM USERS TRAY!
  const otherUsers = users.filter(user => user._id !== currentUserId)

  // RETURN OTHER USERS!
  return otherUsers
}
