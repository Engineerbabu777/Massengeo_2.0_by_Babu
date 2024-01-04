import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {
  fetchingConversationMessages,
  fetchingMessagesFailed,
  fetchingMessagesSuccess,
  updateConversationsOnRealtime,
  updateMessagesOnRealtime
} from '../redux/chatSlice'
import { socket } from '../components/RightSide/Messages/Messages'

export default function useMessages () {
  const dispatch = useDispatch()

  const sendMessages = async (messageType, message, conversationId) => {
    // FOR NOW!
    // TYPE = TEXT!
    // MESSAGE CAN ON BE TEXT!

    try {
      const response = await fetch(
        'http://localhost:4444/api/v1/messages/send-message',
        {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          },
          body: JSON.stringify({ message, messageType, conversationId })
        }
      ).then(resp => resp.json())

      if (response?.error) throw new Error(response?.message)

      // I NEED TO UPDATE THE MESSAGES ARRAY AS WELL AS THE CONVERSATIONS ARRAY!
      dispatch(updateConversationsOnRealtime(response.updatedConversation))
      dispatch(updateMessagesOnRealtime(response.newMessage));


      // NOTE: CHECKS WHETHER THE CHAT IS OPEN OR NOT!

      socket.emit('message-sent', {
        newMessage: response?.newMessage,
        updatedConversation: response?.updatedConversation,
        conversationId: response?.updatedConversation?._id
      })

      console.log({ response })
      toast.success('message sent!')
    } catch (error) {
      console.log('Sending Messages Error: ', error?.message)
      toast.error('message failed!')
    }
  }

  const fetchChatByConversation = async conversationId => {
    try {
      dispatch(fetchingConversationMessages())
      const response = await fetch(
        `http://localhost:4444/api/v1/messages/get-messages/${conversationId}`,
        {
          method: 'GET',
          headers: {
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          }
        }
      ).then(resp => resp.json())

      if (response?.error) throw new Error(response?.message)

      console.log({ response })
      dispatch(fetchingMessagesSuccess(response?.messages))
    } catch (error) {
      console.log('Sending Messages Error: ', error?.message)
      toast.error('message failed!')
      dispatch(fetchingMessagesFailed())
    }
  }

  const markMessageAsReadOnRealTime = async(conversationId,messageId) => {
    /*THAT MEANS THE CURRENT USER HAS SEEN THE RECEIVED MESSAGE SO WE NEED TO UPDATE IT TO BE READ ON REALTIME!
    */
    try {
      dispatch(fetchingConversationMessages())
      const response = await fetch(
        `http://localhost:4444/api/v1/messages/update-read-message/${conversationId}/${messageId}`,
        {
          method: 'PUT',
          headers: {
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          }
        }
      ).then(resp => resp.json())

      if (response?.error) throw new Error(response?.message)

      console.log({response})

      console.log({ response })
    } catch (error) {
      console.log('UPDATE READ MESSAGE ERROR: ', error?.message)
      toast.error('message failed!')
    }
  } 
  return { sendMessages, fetchChatByConversation,markMessageAsReadOnRealTime }
}
