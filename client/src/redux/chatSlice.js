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
    fetchingConversations: state => {
      state.fetchingConversations = true
    },
    fetchingConversationsFailed: state => {
      state.fetchingConversations = false
    },
    fetchingConversationMessages: state => {
      state.fetchingMessages = true
    },
    fetchingMessagesSuccess: (state, actions) => {
      state.activeUserMessages = actions.payload
      console.log({messages:actions.payload})
      state.fetchingMessages = false
    },
    fetchingMessagesFailed: state => {
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
  fetchingMessagesSuccess,
  fetchingConversationMessages
} = chatSlice.actions
export const chatReducer = chatSlice.reducer
