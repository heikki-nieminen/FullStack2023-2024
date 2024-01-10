import { createSlice } from '@reduxjs/toolkit'
import { Quiz } from './types'

const initialState: Quiz = {
  id: null,
  name: null,
  questions: null,
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setQuiz: (state, action) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.questions = action.payload.questions
    },
  },
})
export const { setQuiz } = quizSlice.actions
export default quizSlice.reducer
