import { createSlice } from '@reduxjs/toolkit'

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    activeSetting: 'user'
  },
  reducers: {
    updateActiveSettingState: (state, actions) => {
      state.activeSetting = actions.payload
    }
  }
})

export const { updateActiveSettingState } = settingSlice.actions
export const settingReducer = settingSlice.reducer
