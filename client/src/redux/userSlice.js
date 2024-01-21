import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    loadingUsers: false,
    alreadyLoadedUsers: false,
    searchUsers: [],
    loadingSearchUsers: false,
    updatingUser: false,
    blockedUsers: [],
    fetchingBlockedUsers: false,
    alreadyFetchedBlockedUsers: false
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
    },
    fetchingBlockedUsers: (state, action) => {
      state.fetchingBlockedUsers = true
    },
    fetchedAllBlockedUsersSuccess: (state, action) => {
      state.fetchingBlockedUsers = false
      state.alreadyFetchedBlockedUsers = true
      state.blockedUsers = action.payload
    },
    fetchedAllBlockedUsersError: (state, action) => {
      state.fetchingBlockedUsers = false
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
  userHasUpdated,
  fetchedAllBlockedUsersError,
  fetchedAllBlockedUsersSuccess,
  fetchingBlockedUsers
} = userSlice.actions
export const userReducer = userSlice.reducer