import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loadingUsers: false,
    alreadyLoadedUsers: false,
    searchUsers: [],
    loadingSearchUsers: false
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
    },
    fetchingSearchUsers: state => {
      state.loadingSearchUsers = true
    },
    fetchedSearchUsers: (state, action) => {
      state.searchUsers = action.payload
      state.loadingSearchUsers = false
    }
  }
})

export const {
  fetchedUsers,
  fetchingUsersSuccess,
  fetchingUsers,
  fetchedSearchUsers,
  fetchingSearchUsers
} = userSlice.actions
export const userReducer = userSlice.reducer
