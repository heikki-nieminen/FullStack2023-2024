import { Router } from 'express'
import {
  loginHandler,
  registerHandler,
  verifyTokenHandler,
} from './userHandlers'
import { auth } from '../utils/authentication'

export const userRouter = Router()

// Authentication
userRouter.post('/login', loginHandler)
userRouter.post('/register', registerHandler)
userRouter.get('/verifyToken', auth.userAuth, verifyTokenHandler)
