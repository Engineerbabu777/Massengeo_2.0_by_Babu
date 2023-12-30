import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {
  fetchingConversationMessages,
  fetchingMessagesFailed,
  fetchingMessagesSuccess
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

      socket.emit('message-sent', message)


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

  return { sendMessages, fetchChatByConversation }
}
