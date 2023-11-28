import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import quizReducer from './reducers/quizSlice'
import questionReducer from './reducers/questionSlice'
import answerReducer from './reducers/answerSlice'

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
    question: questionReducer,
    answer: answerReducer,
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
