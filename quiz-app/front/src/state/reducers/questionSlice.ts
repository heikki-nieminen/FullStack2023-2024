import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { fetchQuestions } from './utils'
import { RootState } from '../store'

export interface QuestionType {
  id: number
  name: string
  quizId: number | string
}

export interface QuestionState {
  questions: QuestionType[]
  selectedQuestion: number | null
  status: string | null
  error: string | undefined
}

const initialState: QuestionState = {
  questions: [
    { id: 0, name: 'Testi kysymys', quizId: 0 },
    { id: 1, name: 'Testi kysymys1', quizId: 1 },
    { id: 2, name: 'Testi kysymys2', quizId: 1 },
  ],
  selectedQuestion: null,
  status: null,
  error: undefined,
}

export const questionSlice = createSlice({
  name: 'question',
  initialState,
  reducers: {
    selectQuestion: (
      state,
      action: PayloadAction<{ questionIndex: number }>
    ) => {
      state.selectedQuestion = action.payload.questionIndex
    },
    addNewQuestion: (state, action) => {
      state.questions.push(action.payload)
    },
    deleteQuestion: (
      state,
      action: PayloadAction<{ questionIndex: number }>
    ) => {
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload.questionIndex
      )
    },
    renameQuestion: (
      state,
      action: PayloadAction<{ questionIndex: number; name: string }>
    ) => {
      state.questions[action.payload.questionIndex].name = action.payload.name
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        console.log('Data fetched:', action.payload.data)
        console.log('State:', state.status)
        state.status = 'succeeded'
        state.questions = action.payload.data
      })
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default questionSlice.reducer

export const selectQuestionsByQuizId =
  (id: number | string) => (state: RootState) => {
    return state.question.questions.filter((question) => question.quizId === id)
  }

export const { addNewQuestion } = questionSlice.actions
