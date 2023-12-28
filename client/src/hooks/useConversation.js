import { useState } from 'react'
import toast from 'react-hot-toast'

export default function useConversation () {
  const [creatingConversation, setCreatingConversation] = useState(false)

  const createConversation = async userId => {
    // CHECK IF USERID IS PROVIDED
    if (!userId) return

    try {
      // MAKE A REQUEST!
      const response = await fetch(
        // API ENDPOINT FOR CREATING A CONVERSATION
        'http://locahost:4444/api/v1/conversation/create-conversation',
        {
          // HTTP METHOD: POST
          method: 'POST',
          // HEADERS FOR THE REQUEST
          headers: {
            'Content-Type': 'application/json',
            // AUTHORIZATION HEADER WITH THE USER'S TOKEN OBTAINED FROM LOCAL STORAGE
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          },
          // REQUEST BODY CONTAINING THE USERID IN JSON FORMAT
          body: JSON.stringify({ userId })
        }
      ).then(resp => resp.json())

      // CHECK IF THE RESPONSE CONTAINS AN ERROR
      if (response?.error) throw new Error(response?.error?.message)

      // LOG THE RESPONSE AND DISPLAY A SUCCESS TOAST
      console.log({ response })
      toast.success(response?.message)
    } catch (error) {
      // LOG THE ERROR AND DISPLAY AN ERROR TOAST
      console.log({ error: error.message })
      toast.error(error?.message)
    }
  }
  return { createConversation, creatingConversation }
}
