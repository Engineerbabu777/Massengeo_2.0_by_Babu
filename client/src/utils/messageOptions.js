import { updateFooterInput } from '../redux/chatSlice'

export const messageOptions = (opt, message, dispatch) => {
  if (opt === 'edit') {
    // FIRST:->  SET INPUT TO BE MESSAGE!!
    dispatch(updateFooterInput(message?.message))

  }

  if (opt === 'delete_me') {
    // FIRST:->  DELETE THE MESSAGE!!
    // SECOND:-> UPDATE THIS MESSAGE ONLY FOR ME!!
  }
  if (opt === 'delete_everyone') {
    // FIRST:->  DELETE THE MESSAGE!!
    // SECOND:-> UPDATE THIS MESSAGE ONLY FOR ME!!
    // THIRD:-> UPDATE ON THE OTHER_END AS WELL!!
  }
}
