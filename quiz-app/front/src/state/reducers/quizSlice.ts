import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchQuizzes } from './utils'
import { RootState } from '../store'

export interface QuizType {
  id: string | number
  name: string
}

export interface QuizState {
  selectedQuiz: number | null
  quizzes: QuizType[]
  status: string | null
  error: string | undefined
}

const initialState: QuizState = {
  selectedQuiz: null,
  quizzes: [],
  status: null,
  error: undefined,
}

export const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    initializeData: (state, action) => {
      state.quizzes = action.payload.quizzes
      state.selectedQuiz = null
    },
    selectQuiz: (state, action: PayloadAction<{ quizId: number }>) => {
      state.selectedQuiz = action.payload.quizId
    },
    addNewQuiz: (
      state,
      action: PayloadAction<{ name: string; id: string }>
    ) => {
      state.quizzes.push({ id: action.payload.id, name: action.payload.name })
    },
    deleteQuiz: (state, action: PayloadAction<{ quizId: number }>) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz.id !== action.payload.quizId
      )
    },
    renameQuiz: (
      state,
      action: PayloadAction<{ quizIndex: number; name: string }>
    ) => {
      state.quizzes[action.payload.quizIndex].name = action.payload.name
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        console.log('Data fetched:', action.payload.data)
        console.log('State:', state.status)
        state.status = 'succeeded'
        state.quizzes = action.payload.data
      })
      .addCase(fetchQuizzes.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default quizSlice.reducer

export const selectQuizzes = (state: RootState) => state.quiz.quizzes
export const selectQuizById = (id: string) => (state: RootState) =>
  state.quiz.quizzes.filter((quiz) => quiz.id === id)[0]

export const selectStatus = (state: RootState) => state.quiz.status

export const {
  initializeData,
  selectQuiz,
  addNewQuiz,
  deleteQuiz,
  renameQuiz,
} = quizSlice.actions
