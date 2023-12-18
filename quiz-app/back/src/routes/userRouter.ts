import { Router } from 'express'
import {
  getAllQuizzesHandler,
  getQuizHandler,
  loginHandler,
  registerHandler,
  verifyTokenHandler,
} from './userHandlers'
import { auth } from '../utils/authentication'

export const userRouter = Router()

// Authentication
userRouter.post('/login', loginHandler)
userRouter.post('/register', registerHandler)
userRouter.get('/verify-token', auth.userAuth, verifyTokenHandler)

userRouter.get('/get-quizzes', auth.userAuth, getAllQuizzesHandler)
userRouter.get('/get-quiz/:id', getQuizHandler)

userRouter.get('/get-user-quizzes')
userRouter.get('/get-quiz/:id')
