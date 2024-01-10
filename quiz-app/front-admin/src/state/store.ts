import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import quizReducer from './reducers/quizSlice'
import questionReducer from './reducers/questionSlice'
import answerReducer from './reducers/answerSlice'
import { useDispatch } from 'react-redux'
import userReducer from './reducers/userSlice'

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    question: questionReducer,
    answer: answerReducer,
    user: userReducer,
  },
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
