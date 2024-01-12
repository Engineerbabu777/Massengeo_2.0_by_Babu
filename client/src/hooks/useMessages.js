import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import {
  fetchingConversationMessages,
  fetchingMessagesFailed,
  fetchingMessagesSuccess,
  updateConversationsOnRealtime,
  updateEditMessageId,
  updateEditedMode,
  updateMessagesOnRealtime,
  updateMessagesWithDeletedOne,
  updateMessagesWithEditedMessage
} from '../redux/chatSlice'
import { socket } from '../components/RightSide/Messages/Messages'
import { useSelector } from 'react-redux'
import { findOtherUsers } from '../utils/otherUsers'

export default function useMessages () {
  const dispatch = useDispatch()

  const activeConversationInfo = useSelector(
    state => state.chat.activeConversationInfo
  )
  const isEditedMode = useSelector(state => state.chat.inputUpdateState)

  const sendMessages = async (messageType, message, conversationId) => {
    // FOR NOW!
    // TYPE = TEXT!
    // MESSAGE CAN ON BE TEXT!

    // LETS CONFIRM THE RECEIVERS OF THE MESSAGE!
    // LETS CHECK IF GROUP CHAT OR NOT!
    const isGroupChat = activeConversationInfo.group // IF GROUP THAN TRUE ELSE FALSE!!!
    const receiverIDS = findOtherUsers(activeConversationInfo.users).map(
      u => u?._id
    ) // REMOVING OUR SELF FROM THE CONVERSATION USERS!

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
          body: JSON.stringify({
            message,
            messageType,
            conversationId,
            receiverId: receiverIDS // ALL IDS IN AN ARRAY!!
          })
        }
      ).then(resp => resp.json())

      if (response?.error) throw new Error(response?.message)

      // I NEED TO UPDATE THE MESSAGES ARRAY AS WELL AS THE CONVERSATIONS ARRAY!
      dispatch(updateConversationsOnRealtime(response.updatedConversation))
      dispatch(updateMessagesOnRealtime(response.newMessage))

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

  const markMessageAsReadOnRealTime = async (conversationId, messageId) => {
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

      console.log({ response })

      console.log({ response })
    } catch (error) {
      console.log('UPDATE READ MESSAGE ERROR: ', error?.message)
      toast.error('message failed!')
    }
  }

  const updateMessage = async (
    messageType,
    newMessage,
    messageId,
    conversationId
  ) => {
    const isGroupChat = activeConversationInfo.group // IF GROUP THAN TRUE ELSE FALSE!!!
    const receiverIDS = findOtherUsers(activeConversationInfo.users).map(
      u => u?._id
    ) // REMOVING OUR SELF FROM THE CONVERSATION USERS!

    try {
      const response = await fetch(
        'http://localhost:4444/api/v1/messages/update-message',
        {
          method: 'PUT',
          headers: {
            'content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          },
          body: JSON.stringify({
            message: newMessage,
            messageId,
            messageType,
            conversationId,
            receiverId: receiverIDS // ALL IDS IN AN ARRAY!!
          })
        }
      ).then(resp => resp.json())

      if (response?.error) throw new Error(response?.message)

      // I NEED TO UPDATE THE MESSAGES ARRAY AS WELL AS THE CONVERSATIONS ARRAY!
      dispatch(updateConversationsOnRealtime(response?.updatedConversation)) // WILL SEE IT LATER!!
      dispatch(updateMessagesWithEditedMessage(response?.editedMessage))

      // NOTE: CHECKS WHETHER THE CHAT IS OPEN OR NOT!

      socket.emit('message-edited', {
        editedMessage: response?.newMessage,
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

  const deleteMessage = async (type, messageId) => {
    try {
      const response = await fetch(
        'http://localhost:4444/api/v1/messages/delete-message',
        {
          method: 'DELETE',
          headers: {
            'content-Type': 'application/json',
            authorization: JSON.parse(localStorage.getItem('userData@**@user'))
              ?.token
          },
          body: JSON.stringify({ type, messageId })
        }
      ).then(resp => resp.json())

      // IF ERROR!
      if (response?.error) throw new Error(response?.message)

      // I NEED TO UPDATE THE MESSAGES ARRAY AS WELL AS THE CONVERSATIONS ARRAY!
      dispatch(updateConversationsOnRealtime(response?.updatedConversation)) // WILL SEE IT LATER!!
      dispatch(updateMessagesWithDeletedOne(response?.deletedMessage))

      socket.emit('message-deleted', {
        deletedMessage: response?.deletedMessage,
        updatedConversation: response?.updatedConversation,
        conversationId: response?.updatedConversation?._id
      })

      // IF SUCCESS!!
    } catch (error) {
      console.log('delete message Error: ', error?.message)
      toast.error('deletion failed!')
    }
  }

  return {
    sendMessages,
    fetchChatByConversation,
    markMessageAsReadOnRealTime,
    updateMessage,
    deleteMessage
  }
}
