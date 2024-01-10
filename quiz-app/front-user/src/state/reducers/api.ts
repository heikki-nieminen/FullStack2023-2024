import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { LoginResponse, RegisterResponse, User } from './types'
import { getToken } from './userSlice'
import { RootState } from '../store'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState
      const token = getToken(state)
      if (token) {
        headers.set('Authorization', `Token ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    // Register user
    registerUser: build.mutation<RegisterResponse, Partial<User>>({
      query: ({ username, password }: User) => ({
        url: '/register',
        method: 'POST',
        body: { username, password },
      }),
    }),
    // Login user
    loginUser: build.mutation<LoginResponse, Partial<User>>({
      query: ({ username, password }: User) => ({
        url: '/login',
        method: 'POST',
        body: { username, password },
      }),
    }),
    // Get quizzes assigned to user
    getQuizzes: build.query({
      query: () => '/get-quizzes',
    }),
    // Get full quiz by quizId
    getQuiz: build.query({
      query: (quizId) => `/get-quiz/${quizId}`,
    }),
    // Submit answers
  }),
})

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetQuizzesQuery,
} = api
