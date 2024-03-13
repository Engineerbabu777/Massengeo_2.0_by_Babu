import {
  fetchingCurrentUserSuccess,
  updateUserStoriesInRealtime
} from '../redux/userSlice'
import { userDetails } from '../utils/getUserDetails'
import { useDispatch } from 'react-redux'
import { socket } from '../components/RightSide/Messages/Messages'
import toast from 'react-hot-toast';

export default function useStories () {
  const dispatch = useDispatch()
  const createStories = async (type, data,closeModal) => {
    // STORY DATA: { storyText: "story", fontFamily: "Helvetica", backgroundColor: "red", textColor: "white"};
    try {
      const response = await fetch(
        'http://localhost:4444/api/v1/user/create-story',
        {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
            authorization: localStorage.getItem('token')
          },
          body: JSON.stringify({ data, userId: userDetails.id, type })
        }
      ).then(res => res.json())

      if (response?.error) throw new Error(response?.message)

      console.log({ response })

      dispatch(
        updateUserStoriesInRealtime({
          updatedUser: response.updatedUser,
          _id: response?.updatedUser?._id
        })
      )

      dispatch(fetchingCurrentUserSuccess(response.updatedUser))

      socket.emit('user-updated-story', {
        updatedUser: response.updatedUser,
        _id: response?.updatedUser?._id
      })

      if(response?.success){
        toast.success("Stories updated successfully")
      }
      closeModal();

    } catch (error) {
      console.log({ error })
    }
  }

  const deleteStories = () => {}

  const handleSubmitStories = storyData => {}

  return {
    createStories,
    deleteStories,
    handleSubmitStories
  }
}
