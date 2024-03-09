import { userDetails } from '../utils/getUserDetails'

export default function useStories () {
  const createStories = async (type, data) => {
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

      // !TODO:
      // send back the updated user to the client!
      // update the user friends data with new data!
      // also update the user conversations !OR
      // find all conversations and update this user in that conversations of single chats!
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
