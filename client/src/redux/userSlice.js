import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loadingUsers: false,
    alreadyLoadedUsers: false,
    searchUsers: [],
    loadingSearchUsers: false,
    updatingUser: false
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
    },
    updatingUser: (state, action) => {
      state.updatingUser = true
    },
    userHasUpdated: (state, action) => {
      state.updatingUser = false
      console.log(action.payload)
      localStorage.setItem(
        'userData@**@user',
        JSON.stringify({
          username: action.payload.username,
          email: action.payload.email,
          avatar: action.payload.avatar,
          about: action.payload.about,
          id: action.payload._id,
          token: localStorage.getItem('token')
        })
      ) // Update the user in local storage!
    }
  }
})

export const {
  fetchedUsers,
  fetchingUsersSuccess,
  fetchingUsers,
  fetchedSearchUsers,
  fetchingSearchUsers,
  updatingUser,
  userHasUpdated
} = userSlice.actions
export const userReducer = userSlice.reducer
