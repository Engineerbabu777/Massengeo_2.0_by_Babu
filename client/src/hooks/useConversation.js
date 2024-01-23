import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchingConversations,
  fetchingConversationsFailed,
  fetchingConversationsSuccess,
  updateConversationsWithNewConversation
} from '../redux/chatSlice'
import {
  fetchingUserFriends,
  fetchingUserFriendsSuccess
} from '../redux/userSlice'
import { socket } from '../components/RightSide/Messages/Messages'

export default function useConversation () {
  const [creatingConversation, setCreatingConversation] = useState(false)
  const dispatch = useDispatch()

  const createConversation = async (
    userId = 'change-later',
    users,
    group = false
  ) => {
    // CHECK IF USER_ID IS PROVIDED
    if (!userId && !group) return

    try {
      setCreatingConversation(true)
      let data

      // DATA!
      if (users?.length > 1 && group === true)
        data = users.map(user => user?._id)

      console.log(userId)
      // MAKE A REQUEST!
      const response = await fetch(
        // API ENDPOINT FOR CREATING A CONVERSATION
        'http://localhost:4444/api/v1/conversation/create-conversation',
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
          // REQUEST BODY CONTAINING THE USER_IDS IN JSON FORMAT AS WELL GROUP!!
          body: JSON.stringify({
            userIds: users?.length > 1 ? data : userId,
            group: users?.length > 1 ? true : false
          })
        }
      ).then(resp => resp.json())

      // CHECK IF THE RESPONSE CONTAINS AN ERROR
      if (response?.error) throw new Error(response?.error?.message)

      // AS THE CONVERSATION IS CREATED SO NOW ADD IT TO OUR AS WELL TO THE OTHER END!
      socket.emit('create_conversation', response?.newConversation) // TO OTHER END!
      updateConversationsWithNewConversation(response.newConversation) // TO MYSELF!
      // LOG THE RESPONSE AND DISPLAY A SUCCESS TOAST
      console.log({ response })
      setCreatingConversation(false)
      toast.success(response?.message)
    } catch (error) {
      // LOG THE ERROR AND DISPLAY AN ERROR TOAST
      console.log({ error: error.message })
      toast.error(error?.message)
      setCreatingConversation(false)
    }
  }

  const fetchConversations = async () => {
    try {
      dispatch(fetchingConversations())
      // MAKE A REQUEST!
      const response = await fetch(
        // API ENDPOINT FOR FETCHING A CONVERSATION
        'http://localhost:4444/api/v1/conversation/fetch-all',
        {
          // HTTP METHOD: GET
          method: 'GET',
          // HEADERS FOR THE REQUEST
          headers: {
            'Content-Type': 'application/json',
            // AUTHORIZATION HEADER WITH THE USER'S TOKEN OBTAINED FROM LOCAL STORAGE
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          }
        }
      ).then(resp => resp.json())

      // CHECK IF THE RESPONSE CONTAINS AN ERROR
      if (response?.error) throw new Error(response?.error?.message)

      // LOG THE RESPONSE AND DISPLAY A SUCCESS TOAST
      console.log({ response })
      dispatch(fetchingConversationsSuccess(response.conversations))
      toast.success(response?.message)
    } catch (error) {
      // LOG THE ERROR AND DISPLAY AN ERROR TOAST
      console.log({ error: error.message })
      toast.error(error?.message)
      dispatch(fetchingConversationsFailed())
    }
  }

  // FETCH ALL FRIENDS OF USER!
  const fetchFriendsOfUserAsPerConversations = async () => {
    try {
      dispatch(fetchingUserFriends())
      // MAKE A REQUEST!
      const response = await fetch(
        // API ENDPOINT FOR FETCHING A CONVERSATION
        'http://localhost:4444/api/v1/conversation/fetch-all-friends-conversation',
        {
          // HTTP METHOD: GET
          method: 'GET',
          // HEADERS FOR THE REQUEST
          headers: {
            'Content-Type': 'application/json',
            // AUTHORIZATION HEADER WITH THE USER'S TOKEN OBTAINED FROM LOCAL STORAGE
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          }
        }
      ).then(resp => resp.json())

      // CHECK IF THE RESPONSE CONTAINS AN ERROR
      if (response?.error) throw new Error(response?.error?.message)

      // LOG THE RESPONSE AND DISPLAY A SUCCESS TOAST
      console.log({ response: response.friends })
      dispatch(fetchingUserFriendsSuccess(response.friends))
      toast.success(response?.message)
    } catch (error) {
      // LOG THE ERROR AND DISPLAY AN ERROR TOAST
      console.log({ error: error.message })
      toast.error(error?.message)
      // dispatch(fetchingConversationsFailed())
    }
  }
  return {
    createConversation,
    creatingConversation,
    fetchConversations,
    fetchingConversations,
    fetchFriendsOfUserAsPerConversations
  }
}
