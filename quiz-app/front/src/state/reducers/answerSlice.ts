import { createSlice } from '@reduxjs/toolkit'
import { fetchAnswers } from './utils'
import { RootState } from '../store'

export interface AnswerType {
  id: number
  name: string
  questionId: number
}

export interface AnswerState {
  answers: AnswerType[]
  status: string | null
  error: string | undefined
}

const initialState: AnswerState = {
  answers: [
    { id: 0, name: 'Testivastaus', questionId: 1 },
    { id: 1, name: 'Testivastaus2', questionId: 1 },
    { id: 2, name: 'Testivastaus3', questionId: 1 },
    { id: 3, name: 'Testivastaus4', questionId: 1 },
    { id: 4, name: 'Testivastaus5', questionId: 1 },
  ],
  status: null,
  error: undefined,
}

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        console.log('Data fetched:', action.payload.data)
        console.log('State:', state.status)
        state.status = 'succeeded'
        state.answers = action.payload.data
      })
      .addCase(fetchAnswers.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchAnswers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default answerSlice.reducer

export const selectAnswersByQuestionId = (id: number) => (state: RootState) => {
  return state.answer.answers.filter((answer) => answer.questionId === id)
}
