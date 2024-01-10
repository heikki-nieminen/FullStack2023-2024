import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export interface UserState {
  username: string | null
  token: string | null
  loggedIn: boolean
  isAdmin: boolean
}

const initialState: UserState = {
  username: null,
  token: null,
  loggedIn: false,
  isAdmin: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      console.log(action.payload)
      state.loggedIn = true
      state.token = action.payload.token
      state.username = action.payload.username
    },
    loginAdmin: (state, action) => {
      state.loggedIn = true
      state.isAdmin = true
      state.token = action.payload.token
      state.username = action.payload.username
    },
    logoutUser: (state) => {
      state.loggedIn = false
      state.token = null
      state.username = null
      state.isAdmin = false
    },
  },
})

export default userSlice.reducer

export const selectLoggedIn = (state: RootState) => state.user.loggedIn
export const selectUser = (state: RootState) => state.user

export const { loginUser, loginAdmin, logoutUser } = userSlice.actions
