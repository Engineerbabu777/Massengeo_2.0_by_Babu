import { createSlice } from '@reduxjs/toolkit'

const settingSlice = createSlice({
  name: 'user',
  initialState: {
    activeSetting: 'user'
  },
  reducers: {
    updateActiveSettingState: (state, actions) => {
      state.activeSetting = actions.payload.payload
    }
  }
})

export const { updateActiveSettingState } = settingSlice.actions
export const settingReducer = settingSlice.reducer
