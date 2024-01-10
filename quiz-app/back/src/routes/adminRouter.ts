import { Router } from 'express'
import { auth } from '../utils/authentication'
import {
  addAnswerHandler,
  addQuestionHandler,
  addQuizHandler,
  deleteAnswerHandler,
  deleteQuestionHandler,
  deleteQuizHandler,
  getAllAnswersHandler,
  getAllQuestionsHandler,
  getAllQuizzesHandler,
  getAllUsersHandler,
  loginHandler,
  registerHandler,
  updateAnswerHandler,
  updateQuizHandler,
  updatedQuestionHandler,
  verifyTokenHandler,
} from './adminHandlers'

export const adminRouter = Router()

// Authentication
adminRouter.post('/register', registerHandler)
adminRouter.post('/login', loginHandler)
adminRouter.get('/verify-token', auth.adminAuth, verifyTokenHandler)

// Quiz related
adminRouter.get('/get-quizzes', auth.adminAuth, getAllQuizzesHandler)
adminRouter.post('/add-quiz', auth.adminAuth, addQuizHandler)
adminRouter.put('/update-quiz/:id', auth.adminAuth, updateQuizHandler)
adminRouter.delete('/delete-quiz/:id', auth.adminAuth, deleteQuizHandler)

// Question related
adminRouter.get('/get-questions', auth.adminAuth, getAllQuestionsHandler)
adminRouter.post('/add-question', auth.adminAuth, addQuestionHandler)
adminRouter.put('/update-question/:id', auth.adminAuth, updatedQuestionHandler)
adminRouter.delete(
  '/delete-question/:id',
  auth.adminAuth,
  deleteQuestionHandler
)

// Answer related
adminRouter.get('/get-answers', auth.adminAuth, getAllAnswersHandler)
adminRouter.post('/add-answer', auth.adminAuth, addAnswerHandler)
adminRouter.put('/update-answer/:id', auth.adminAuth, updateAnswerHandler)
adminRouter.delete('/delete-answer/:id', auth.adminAuth, deleteAnswerHandler)

// User related
adminRouter.get('/get-users', auth.adminAuth, getAllUsersHandler)
adminRouter.post('/assign-quiz-to-user', auth.adminAuth)
