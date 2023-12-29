import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    openedChatUsers: null,
    conversations: [],
    fetchingConversations: false,
    activeUserMessages: [],
    fetchingMessages: false
  },
  reducers: {
    updateOpenChat: (state, actions) => {
      state.openedChatUsers = actions.payload
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
    },
    fetchingMessagesSuccess: (state, actions) => {
      state.activeUserMessages = actions.payload
      state.fetchingMessages = false
    },
    fetchingMessagesFailed: (state, actions) => {
      state.fetchingMessages = false
    }
  }
})

export const {
  updateOpenChat,
  fetchConversations,
  fetchingConversationsSuccess,
  fetchingConversations,
  fetchingConversationsFailed,
  fetchingMessagesFailed,
  fetchingMessagesSuccess
} = chatSlice.actions
export const chatReducer = chatSlice.reducer
