import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice'
import { sidebarReducer } from './sidebarSlice'
import { chatReducer } from './chatSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    sidebar: sidebarReducer
  }
})
