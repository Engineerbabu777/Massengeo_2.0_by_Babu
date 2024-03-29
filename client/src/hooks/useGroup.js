import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'
import { updateConversationInfo, updateMessagesOnRealtime } from '../redux/chatSlice'
import { socket } from '../components/RightSide/Messages/Messages'

export default function useGroup () {
  const dispatch = useDispatch()
  // UPDATE GROUP INFO(IMAGE/NAME)!
  const updateGroupData = async (value, groupId, updateType, handleClose) => {
    try {
      const response = await fetch(
        'http://localhost:4444/api/v1/conversation/update-group',
        {
          method: 'PUT',
          headers: {
            'content-Type': 'application/json',
            authorization: localStorage.getItem('token')
          },
          body: JSON.stringify({
            updateValue: value.value,
            updateType,
            groupId
          })
        }
      ).then(resp => resp.json())

      // console.log(response)
      if (response?.error) throw new Error(response?.message)
      // CLOSE THE MODAL FIRST!
      handleClose()
      // UPDATE NEW DATA IN STATE!
      dispatch(updateConversationInfo(response.data))
      // TRIGGER NEW SOCKET EVENT FOR REALTIME UPDATES!
      // LATER!
      // console.log({ response })
      toast.success('group updated!')
    } catch (error) {
      console.log('Group Updatation Error: ', error)
      toast.error("Can't update group, try later.")
    }
  }

  // REMOVE GROUP MEMBERS!
  const removeGroupMember = async (
    userId,
    groupId,
    handleClose,
    removeType
  ) => {
    try {
      const response = await fetch(
        'http://localhost:4444/api/v1/conversation/delete-group-member',
        {
          method: 'DELETE',
          headers: {
            'content-Type': 'application/json',
            authorization: localStorage.getItem('token')
          },
          body: JSON.stringify({
            userId,
            groupId,
            removeType
          })
        }
      ).then(resp => resp.json())

      console.log(response)
      if (response?.error) throw new Error(response?.message)
      // CLOSE THE MODAL FIRST!
      handleClose()
      // UPDATE NEW DATA IN STATE!
      dispatch(updateConversationInfo(response.data))

      // GENERATE REALTIME EVENT FOR GROUP DATA UPDATATION!
      socket.emit('update-group-data', {
        conversationData: response.data, // CONVERSATION DATA1
      })

      // GENERATING REALTIME EVENT FOR THAT NEW ONE MESSAGE EVENT!
      dispatch(updateMessagesOnRealtime(response.lastMessage))

      console.log({response})
      socket.emit('message-sent', {
        newMessage: response?.lastMessage,
        updatedConversation: response?.conversationData,
        conversationId: response?.conversationData?._id
      })

      // console.log({ response })
      toast.success('group updated!')
    } catch (error) {
      console.log('Group User Removal/Leave Error: ', error)
      toast.error("Can't update group, try later.")
    }
  }

  return {
    updateGroupData,
    removeGroupMember
  }
}
