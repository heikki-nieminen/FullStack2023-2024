import { createSlice } from '@reduxjs/toolkit'
import { UserState } from './types'
import { RootState } from '../store'

const initialState: UserState = {
  username: null,
  token: null,
  loggedIn: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username
      state.token = action.payload.token
      state.loggedIn = true
    },
    clearUser: (state) => {
      state.username = null
      state.token = null
      state.loggedIn = false
    },
  },
})

export const getToken = (state: RootState) => state.user.token
export const getLoggedIn = (state: RootState) => state.user.loggedIn
export const getUsername = (state: RootState) => state.user.username

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
