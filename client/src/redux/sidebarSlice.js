import { createSlice } from '@reduxjs/toolkit'

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: {
    active: 'chats'
  },
  reducers: {
    updateSidebar: (state, actions) => {
      state.active = actions.payload
    }
  }
})

export const { updateSidebar } = sidebarSlice.actions
export const sidebarReducer = sidebarSlice.reducer
