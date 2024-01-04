import { createSlice } from '@reduxjs/toolkit'

const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    openedChatUsers: null,
    conversations: [],
    fetchingConversations: false,
    activeUserMessages: [],
    fetchingMessages: false,
    activeConversationId: null
  },
  reducers: {
    updateOpenChat: (state, actions) => {
      state.openedChatUsers = actions.payload.users
      state.activeConversationId = actions.payload.conversationId
      console.log(actions.payload.conversationId)
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
      console.log({ messages: actions.payload })
      state.fetchingMessages = false
    },
    fetchingMessagesFailed: state => {
      state.fetchingMessages = false
    },
    updateConversationsOnRealtime: (state, actions) => {
      // FIND THE CONVERSATION ID AND REMOVE REPLACE WITH NEW DATA!

      if (state.conversations.find(c => c._id === actions.payload._id)) {
        // FIND AND UPDATE!
        state.conversations = [
          actions.payload,
          ...state.conversations.filter(c => c._id !== actions.payload._id)
        ]
      }
    },
    updateMessagesOnRealtime: (state, actions) => {
      if (
        state?.activeUserMessages[0]?.conversationId ===
        actions.payload.conversationId
      )
        state.activeUserMessages = [
          ...state.activeUserMessages,
          actions.payload
        ]
    },
    updateMessageIsRead: (state, actions) => {
      if (
        state?.activeUserMessages[0]?.conversationId ===
        actions.payload.conversationId
      ) {
        state.activeUserMessages = state.activeUserMessages.map(m => {
          if (m._id === actions.payload._id) {
            return { ...m, seenBy: [...m.seenBy, actions.payload.userIdToAdd] }
          }
          return m
        })
      }
    },
    updateAllUnreadAsRead: (state, actions) => {
      if (
        state?.activeUserMessages[0]?.conversationId ===
        actions.payload.conversationId
      ) {
        state.activeUserMessages = state.activeUserMessages.map(m => {
          if (m?.seenBy?.includes(actions.payload.userIdToAdd)) {
            return m
          } else {
            return { ...m, seenBy: [...m.seenBy, actions.payload.userIdToAdd] }
          }
        })
      }
    }
  }
})

export const {
  updateMessagesOnRealtime,
  updateOpenChat,
  fetchConversations,
  fetchingConversationsSuccess,
  fetchingConversations,
  fetchingConversationsFailed,
  fetchingMessagesFailed,
  fetchingMessagesSuccess,
  fetchingConversationMessages,
  updateConversationsOnRealtime,
  updateMessageIsRead,
  updateAllUnreadAsRead
} = chatSlice.actions
export const chatReducer = chatSlice.reducer
