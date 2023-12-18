import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchQuizzes, fetchQuizById } from './utils'
import { RootState } from '../store'
import { deleteQuestionsByQuizId } from './questionSlice'

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
    deleteQuiz: (state, action) => {
      deleteQuestionsByQuizId(action.payload)
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload)
    },
    editQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz.id === action.payload.id
          ? { ...quiz, name: action.payload.name }
          : quiz
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
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
      .addCase(fetchQuizById.pending, (state) => {
        state.status = 'pending'
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.quizzes = [...state.quizzes, ...action.payload.data]
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default quizSlice.reducer

export const selectQuizzes = (state: RootState) => state.quiz.quizzes
export const selectQuizById = (id: string) => (state: RootState) => {
  const quiz = state.quiz.quizzes.filter((quiz) => quiz.id === parseInt(id))[0]
  if (quiz) return quiz
}

export const selectStatus = (state: RootState) => state.quiz.status

export const { initializeData, selectQuiz, addNewQuiz, deleteQuiz, editQuiz } =
  quizSlice.actions
