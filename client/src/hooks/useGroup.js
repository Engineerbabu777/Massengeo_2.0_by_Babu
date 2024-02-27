import toast from 'react-hot-toast';
import {useSelector,useDispatch} from 'react-redux';
import { updateConversationInfo } from '../redux/chatSlice';

export default function useGroup () {

  const dispatch = useDispatch();
  // UPDATE GROUP INFO(IMAGE/NAME)!
  const updateGroupData = async (value, groupId, updateType,handleClose) => {

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
              updateValue:value.value,
              updateType,
              groupId,
            })
          }
        ).then(resp => resp.json())
  
        // console.log(response)
        if (response?.error) throw new Error(response?.message)
        // CLOSE THE MODAL FIRST!
        handleClose();
        // UPDATE NEW DATA IN STATE!
        dispatch(updateConversationInfo(response.data));
        // TRIGGER NEW SOCKET EVENT FOR REALTIME UPDATES!
        // LATER!
        // console.log({ response })
        toast.success('group updated!')
      } catch (error) {
        console.log('Group Updatation Error: ', error)
        toast.error('Can\'t update group, try later.')
      }
  }

  // REMOVE GROUP MEMBERS!
  const removeGroupMember = async (userId, groupId,handleClose,removeType) => {
  
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
            removeType,
          })
        }
      ).then(resp => resp.json())

      console.log(response)
      if (response?.error) throw new Error(response?.message)
      // CLOSE THE MODAL FIRST!
      // handleClose();
      // UPDATE NEW DATA IN STATE!
      dispatch(updateConversationInfo(response.data));
      // TODO: REALTIME EVENT GENERATES!
      // TRIGGER NEW SOCKET EVENT FOR REALTIME UPDATES!
      // LATER!
      // console.log({ response })
      toast.success('group updated!')
    } catch (error) {
      console.log('Group User Removal/Leave Error: ', error)
      toast.error('Can\'t update group, try later.')
    }
  }

  return {
    updateGroupData,
    removeGroupMember
  }
}
