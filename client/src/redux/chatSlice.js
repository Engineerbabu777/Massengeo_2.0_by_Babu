import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    openedChat: null
  },
  reducers: {
    updateOpenChat: (state, actions) => {
      state.openedChat = actions.payload
    }
  }
})

export const { updateOpenChat } = chatSlice.actions
export const chatReducer = chatSlice.reducer
