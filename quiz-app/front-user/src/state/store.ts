import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import quizReducer from './reducers/quizSlice'
import { useDispatch } from 'react-redux'
import userReducer from './reducers/userSlice'
import { api } from './reducers/api'

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    user: userReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
