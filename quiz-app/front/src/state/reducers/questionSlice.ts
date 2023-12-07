import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit'
import { fetchQuestions } from './utils'
import { RootState } from '../store'
import { deleteAnswersByQuestionId } from './answerSlice'

export interface QuestionType {
  id: number | string
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
  questions: [],
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
    deleteQuestion: (state, action) => {
      deleteAnswersByQuestionId(action.payload)
      state.questions = state.questions.filter(
        (question) => question.id !== action.payload
      )
    },
    editQuestion: (state, action) => {
      state.questions = state.questions.map((question) =>
        action.payload.id === question.id ? action.payload : question
      )
    },
    deleteQuestionsByQuizId: (state, action) => {
      const questionsToDelete = state.questions.filter(
        (question: QuestionType) => question.quizId === action.payload
      )
      questionsToDelete.forEach((question: QuestionType) => {
        deleteAnswersByQuestionId(question.id)
      })
      state.questions = state.questions.filter(
        (question: QuestionType) => question.quizId !== action.payload
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.fulfilled, (state, action) => {
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

/* const getQuestions = (state: RootState) => (id: string) => {
  return state.question.questions.filter((question) => question.quizId === id)
} */

/* export const selectQuestionsByQuizId =
  (id: number | string) => (state: RootState) => {
    return state.question.questions.filter((question) => question.quizId === id)
  }
 */
export const selectQuestionsByQuizId = (id: string | number) =>
  createSelector(
    (state: RootState) => state.question.questions,
    (questions) =>
      questions.filter((question: QuestionType) => question.quizId === id)
  )

export const {
  addNewQuestion,
  deleteQuestion,
  editQuestion,
  deleteQuestionsByQuizId,
} = questionSlice.actions
