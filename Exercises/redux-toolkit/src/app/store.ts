import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import listReducer from '../features/List/listSlice'

export const store = configureStore({
  reducer: {
    content: listReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
