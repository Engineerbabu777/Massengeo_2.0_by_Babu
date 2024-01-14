import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './userSlice'
import { sidebarReducer } from './sidebarSlice'
import { chatReducer } from './chatSlice'
import { settingReducer } from './settingSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    sidebar: sidebarReducer,
    setting: settingReducer
  }
})
