import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    openedChat: null,
    conversations: [],
    fetchingConversations: false
  },
  reducers: {
    updateOpenChat: (state, actions) => {
      state.openedChat = actions.payload
    },
    fetchingConversationsSuccess: (state, actions) => {
      state.fetchingConversations = false
      state.conversations = actions.payload
    },
    fetchingConversations: (state, actions) => {
      state.fetchingConversations = true
    },
    fetchingConversationsFailed: (state, actions) => {
      state.fetchingConversations = false
    }
  }
})

export const {
  updateOpenChat,
  fetchConversations,
  fetchingConversationsSuccess,
  fetchingConversations,
  fetchingConversationsFailed
} = chatSlice.actions
export const chatReducer = chatSlice.reducer
