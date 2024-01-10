import { createSlice } from '@reduxjs/toolkit'

// Define a Redux slice for managing chat-related state
const chatSlice = createSlice({
  name: 'chats',
  initialState: {
    activeConversationInfo: null, // Users in the currently opened chat
    conversations: [], // List of conversations
    fetchingConversations: false, // Flag indicating whether conversations are being fetched
    activeUserMessages: [], // Messages in the active user's conversation
    fetchingMessages: false, // Flag indicating whether messages are being fetched
    allOnlineUsers: [] // List of all online users
  },
  reducers: {
    // Update the currently opened chat
    updateOpenChat: (state, actions) => {
      state.activeConversationInfo = actions.payload
    },
    // Handle successful fetching of conversations
    fetchingConversationsSuccess: (state, actions) => {
      state.fetchingConversations = false
      state.conversations = actions.payload
    },
    // Set the flag when conversations are being fetched
    fetchingConversations: state => {
      state.fetchingConversations = true
    },
    // Handle failure in fetching conversations
    fetchingConversationsFailed: state => {
      state.fetchingConversations = false
    },
    // Set the flag when conversation messages are being fetched
    fetchingConversationMessages: state => {
      state.fetchingMessages = true
    },
    // Handle successful fetching of messages
    fetchingMessagesSuccess: (state, actions) => {
      state.activeUserMessages = actions.payload
      console.log({ messages: actions.payload })
      state.fetchingMessages = false
    },
    // Handle failure in fetching messages
    fetchingMessagesFailed: state => {
      state.fetchingMessages = false
    },
    // Update conversation data in real-time
    updateConversationsOnRealtime: (state, actions) => {
      // FIND THE CONVERSATION ID AND REPLACE WITH NEW DATA
      if (state.conversations.find(c => c._id === actions.payload._id)) {
        /*
         COND:1-> FIRSTS CHECKING PATHNAME IS NOT EQUAL TO UPDATED CONVERSATION!!( OTHER WISE WE WILL CONSIDER USER IS ALREADY CHATTING WITH SAME USER)
         COND:2-> WE DON'T WANT TO SHOW MESSAGE TO OURSELVES SO WE CHECK THAT SENDER IS NO US!
        */
        if (
          window.location.pathname.split('/')[1] !== actions.payload._id &&
          actions.payload.lastMessage.senderId !==
            JSON.parse(localStorage.getItem('userData@**@user')).id
        ) {
          // WHEN NEW MESSAGE RECEIVED PLAY THE NOTIFICATION!
          document.getElementById('btnClick').click()
        }
        state.conversations = [
          actions.payload,
          ...state.conversations.filter(c => c._id !== actions.payload._id)
        ]
      }
    },
    // Update messages in real-time
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
    // Update the 'seenBy' field of a message to mark it as read
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
    // Update all unread messages as read
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
    },
    // Update the list of online users in real-time
    updateOnlineUsers: (state, actions) => {
      state.allOnlineUsers = Object.values(actions.payload.onlineUsers)
    },
    // UPDATING READ COUNTS TO ZERO!
    updateUnreadCounts: (state, actions) => {
      state.conversations = state.conversations.map(c => {
        if (c._id === actions.payload.conversationId) {
          return { ...c, unreadCount: { ...c.unreadCount, count: 0 } }
        } else {
          return c
        }
      })
    }
  }
})

// Extract action creators and reducer from the slice
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
  updateAllUnreadAsRead,
  updateOnlineUsers,
  updateUnreadCounts
} = chatSlice.actions

export const chatReducer = chatSlice.reducer
