import toast from 'react-hot-toast'

export default function useMessages () {
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

      console.log({ response })
      toast.success('message sent!')
    } catch (error) {
      console.log('Sending Messages Error: ', error?.message)
      toast.error('message failed!')
    }
  }

  return { sendMessages }
}
