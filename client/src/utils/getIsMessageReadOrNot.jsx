export const isMessageReadByOrNot = seenArray => {
  // OTHER USER ID!!
  const usersSeenCurrentMessage = seenArray.filter(
    id => id !== JSON.parse(localStorage.getItem('userData@**@user')).id
  )

  // FOR NOW ONLY SINGLE CONVERSATION
  // LATER FOR GROUP AS WELL!
  if (usersSeenCurrentMessage.length > 0) {
    return true // MEANS OTHER USER HAS READ THE MESSAGE
  } else {
    return false // OTHER USER HAS NOT SEEN THE MESSAGE!
  }
}

// REQUESTED USER WILL BE THE SENDER!! TRUE
// REMOVE ME FROM SEEN USERS AND SEE WETHER ITS SEEN BY THE USER OR NOT!
