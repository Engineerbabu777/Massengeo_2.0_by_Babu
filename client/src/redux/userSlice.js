import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loadingUsers: false,
    alreadyLoadedUsers: false,
    
  },
  reducers: {
    fetchedUsers: (state, action) => {
      state.users = action.payload
      state.alreadyLoadedUsers = true
    },
    fetchingUsers: state => {
      state.loadingUsers = true
    },
    fetchingUsersSuccess: state => {
      state.loadingUsers = false
    }
  }
})

export const { fetchedUsers, fetchingUsersSuccess, fetchingUsers } =
  userSlice.actions
export const userReducer = userSlice.reducer
