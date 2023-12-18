import { NextFunction, Response } from 'express'
import {
  addQuiz,
  getAllQuizzes,
  getQuiz,
  loginUser,
  registerUser,
} from '../queries/userQueries'
import { RouteHandler } from '../types'
import { RequestWithUser, hashPassword } from '../utils/authentication'
import { SALT_ROUNDS } from '../config'

// Authentication
// Login handler
export const loginHandler: RouteHandler = async (req, res, next) => {
  try {
    const loginUserResult = await loginUser(req.body)
    if (loginUserResult.error) return next(loginUserResult)
    res.status(200).json({ token: loginUserResult.data?.token })
  } catch (err) {
    return next({ message: err })
  }
}
// Register handler
export const registerHandler: RouteHandler = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password)
    const registerUserResult = await registerUser({
      username: req.body.username,
      password: hashedPassword,
    })
    if (registerUserResult.error) {
      console.log('???')
      return next(registerUserResult)
    }
    const loginUserResult = await loginUser(req.body)
    if (loginUserResult.error) {
      console.log('Täsä:', loginUserResult)
      return next(loginUserResult)
    }
    res.status(200).json({ token: loginUserResult.data?.token })
  } catch (err) {
    console.log('Error:', err)
    return next({ message: err })
  }
}
// Check token
export const verifyTokenHandler: RouteHandler = async (
  req: RequestWithUser,
  res,
  next
) => {
  try {
    res.status(200).json({ message: 'token validated', data: req.user })
  } catch (error) {
    console.error('Token validation error:', error)
    return next(error)
  }
}

// Quiz related
// Fetch all quizzes for user
export const getAllQuizzesHandler: RouteHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  console.log('Getting all quizzes')
  try {
    const userId = req.user?.id

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
    } else {
      const getAllQuizzesResult = await getAllQuizzes(userId)

      if (getAllQuizzesResult.error) {
        next(getAllQuizzesResult)
      } else {
        console.log('Got quizzes:', getAllQuizzesResult)
        res
          .status(200)
          .json({
            message: getAllQuizzesResult.message,
            data: getAllQuizzesResult.data,
          })
      }
    }
  } catch (err) {
    console.error('Error getting quizzes:', err)
    next(err)
  }
}
// Fetch single quiz
export const getQuizHandler: RouteHandler = async (req, res, next) => {
  const quizId = parseInt(req.params.id)
  try {
    const getQuizResult = await getQuiz(quizId)
    if (getQuizResult.error) return next(getQuizResult)
    res
      .status(200)
      .json({ data: getQuizResult.data })
  } catch (err) {
    console.error('Error getting quiz:', err)
    next(err)
  }
}
// Submit quiz

// Get score

//