import { createSlice, createSelector } from '@reduxjs/toolkit'
import { fetchAnswers } from './utils'
import { RootState } from '../store'

export interface AnswerType {
  id: number | string
  name: string
  questionId: number | string
  isCorrect: boolean
}

export interface AnswerState {
  answers: AnswerType[]
  status: string | null
  error: string | undefined
}

const initialState: AnswerState = {
  answers: [],
  status: null,
  error: undefined,
}

export const answerSlice = createSlice({
  name: 'answer',
  initialState,
  reducers: {
    addNewAnswer: (state, action) => {
      state.answers.push(action.payload)
    },
    deleteAnswer: (state, action) => {
      console.log('Deleting answer:', action.payload)
      state.answers = state.answers.filter(
        (answer) => answer.id !== action.payload
      )
    },
    editAnswer: (state, action) => {
      console.log('Editing answer:', action.payload.id)
      state.answers = state.answers.map((answer) =>
        answer.id === action.payload.id ? action.payload : answer
      )
    },
    deleteAnswersByQuestionId: (state, action) => {
      state.answers = state.answers.filter(
        (answer: AnswerType) => answer.questionId !== action.payload
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnswers.fulfilled, (state, action) => {
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

/* export const selectAnswersByQuestionId =
  (id: number | string) => (state: RootState) => {
    return state.answer.answers.filter((answer) => answer.questionId === id)
  } */

export const selectAnswersByQuestionId = (id: string | number) =>
  createSelector(
    (state: RootState) => state.answer.answers,
    (answers) =>
      answers.filter((answer: AnswerType) => answer.questionId === id)
  )

export const { addNewAnswer, deleteAnswer, editAnswer, deleteAnswersByQuestionId } = answerSlice.actions
