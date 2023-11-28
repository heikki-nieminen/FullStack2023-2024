import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchQuizzes = createAsyncThunk('quiz/fetchQuizzes', async () => {
  try {
    const response = await fetch('http://localhost:3001/getQuizzes')
    const data = await response.json()
    return data
  } catch (err) {
    console.error('Error getting data from server:', err)
  }
  return { selectedQuiz: null, quizzes: [] }
})

export const fetchQuestions = createAsyncThunk(
  'question/fetchQuestions',
  async () => {
    try {
      const response = await fetch('http://localhost:3001/getQuestions')
      const data = await response.json()
      return data
    } catch (err) {
      console.error('Error getting data from server:', err)
    }
    return { selectedQuestion: null, questions: [] }
  }
)

export const fetchAnswers = createAsyncThunk(
  'answer/fetchAnswers',
  async () => {
    try {
      const response = await fetch('http://localhost:3001/getAnswers')
      const data = await response.json()
      return data
    } catch (err) {
      console.error('Error getting data from server:', err)
    }
    return { selectedAnswer: null, answers: [] }
  }
)
