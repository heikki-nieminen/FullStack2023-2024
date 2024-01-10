import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../store'

export const fetchQuizzes = createAsyncThunk(
  'quiz/fetchQuizzes',
  async (_, { getState }) => {
    console.log('Fetching quizzes')
    try {
      const state = getState() as RootState
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_ADDRESS}/api/admin/get-quizzes`,
        {
          headers: {
            Authorization: `Token ${state.user.token}`,
          },
        }
      )
      console.log('Successfully fetched quizzes:', response)
      const data = await response.json()
      return data
    } catch (err) {
      console.error('Error getting data from server:', err)
    }
    return { selectedQuiz: null, quizzes: [] }
  }
)

export const fetchQuestions = createAsyncThunk(
  'question/fetchQuestions',
  async (_, { getState }) => {
    try {
      const state = getState() as RootState
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_ADDRESS}/api/admin/get-questions`,
        {
          headers: {
            Authorization: `Token ${state.user.token}`,
          },
        }
      )
      const data = await response.json()
      console.log('Question data:', data)
      return data
    } catch (err) {
      console.error('Error getting data from server:', err)
    }
    return { selectedQuestion: null, questions: [] }
  }
)

export const fetchAnswers = createAsyncThunk(
  'answer/fetchAnswers',
  async (_, { getState }) => {
    try {
      const state = getState() as RootState
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_ADDRESS}/api/admin/get-answers`,
        {
          headers: {
            Authorization: `Token ${state.user.token}`,
          },
        }
      )
      const data = await response.json()
      console.log('Answers:', data)
      return data
    } catch (err) {
      console.error('Error getting data from server:', err)
    }
    return { selectedAnswer: null, answers: [] }
  }
)

export const fetchQuizById = createAsyncThunk(
  'quiz/getQuizById',
  async (quizId) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_API_ADDRESS}/api/getQuiz/${quizId}`
    )
    console.log('Response:', response)
    const data = await response.json()
    return data
  }
)
