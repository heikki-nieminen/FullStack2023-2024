import { NextFunction, Response } from 'express'
import {
  addAnswer,
  addQuestion,
  addQuiz,
  deleteAnswer,
  deleteQuestion,
  deleteQuiz,
  getAllAnswers,
  getAllQuestions,
  getAllQuizzes,
  loginAdmin,
  registerAdmin,
  updateAnswer,
  updateQuiz,
  updatedQuestion,
} from '../queries/adminQueries'
import { RouteHandler } from '../types'
import { RequestWithUser, hashPassword } from '../utils/authentication'

export const registerHandler: RouteHandler = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password)
    const registerUserResult = await registerAdmin({
      username: req.body.username,
      password: hashedPassword,
    })
    if (registerUserResult.error) {
      console.log('???')
      return next(registerUserResult)
    }
    const loginUserResult = await loginAdmin(req.body)
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

export const loginHandler: RouteHandler = async (req, res, next) => {
  try {
    const loginUserResult = await loginAdmin(req.body)
    if (loginUserResult.error) return next(loginUserResult)
    res.status(200).json({ token: loginUserResult.data?.token })
  } catch (err) {
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
// Get quizzes
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
        res.status(200).json({ data: getAllQuizzesResult.data })
      }
    }
  } catch (err) {
    console.error('Error getting quizzes:', err)
    return next(err)
  }
}
// Add quiz
export const addQuizHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const addQuizResult = await addQuiz({
      name: req.body.name,
      creator_id: req.user.id,
    })
    if (addQuizResult.error) {
      console.log('ERROR:', addQuizResult)
      return next(addQuizResult)
    }
    res
      .status(201)
      .json({ message: 'Quiz added succesfully', id: addQuizResult.data })
  } catch (err) {
    console.error('Error adding quiz:', err)
    return next(err)
  }
}
// Update quiz
export const updateQuizHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const updateQuizResult = await updateQuiz({
      id: parseInt(req.params.id),
      name: req.body.name,
      userId: req.user.id,
    })
    if (updateQuizResult.error) return next(updateQuizResult)
    res.status(201).json({ message: 'Quiz updated successfully' })
  } catch (err) {
    console.error('Error updating quiz:', err)
    return next()
  }
}
// Delete quiz
export const deleteQuizHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const deleteQuizResult = await deleteQuiz({
      id: parseInt(req.params.id),
      userId: req.user.id,
    })
    if (deleteQuizResult.error) return next(deleteQuizResult)
    res.status(200).json({ message: 'Quiz deleted successfully' })
  } catch (err) {
    console.error('Error deleteing quiz:', err)
    return next()
  }
}

// Question related
// Get questions
export const getAllQuestionsHandler: RouteHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  console.log('Getting all questions')
  try {
    const userId = req.user?.id

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
    } else {
      const getAllQuestionsResult = await getAllQuestions(userId)

      if (getAllQuestionsResult.error) {
        next(getAllQuestionsResult)
      } else {
        console.log('Got questions:', getAllQuestionsResult)
        res.status(200).json({ data: getAllQuestionsResult.data })
      }
    }
  } catch (err) {
    console.error('Error getting questions:', err)
    return next(err)
  }
}
// Add question
export const addQuestionHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const addQuestionResult = await addQuestion({
      name: req.body.name,
      quiz_id: req.body.quizId,
    })

    if (addQuestionResult.error) {
      console.log('ERROR:', addQuestionResult)
      return next(addQuestionResult)
    }
    res
      .status(201)
      .json({ message: 'Quiz added succesfully', id: addQuestionResult.data })
  } catch (err) {
    console.error('Error adding question:', err)
    return next(err)
  }
}
// Update question
export const updatedQuestionHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const updateQuestionResult = await updatedQuestion({
      ...req.body,
      userId: req.user.id,
    })
    if (updateQuestionResult.error) return next(updateQuestionResult)
    res.status(201).json('Question updated successfully')
  } catch (err) {
    console.error('Error updating question:', err)
    return next(err)
  }
}
// Delete question
export const deleteQuestionHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const deleteQuestionResult = await deleteQuestion({
      id: parseInt(req.params.id),
      userId: req.user.id,
    })
    if (deleteQuestionResult.error) return next(deleteQuestionResult)
    res.status(200).json({ message: 'Question deleted successfully' })
  } catch (err) {
    console.error('Error deleteing question:', err)
    return next(err)
  }
}

// Answer realated
// Get answers
export const getAllAnswersHandler: RouteHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  console.log('Getting all answers')
  try {
    const userId = req.user?.id

    if (!userId) {
      res.status(401).json({ error: 'Unauthorized' })
    } else {
      const getAllAnswersResult = await getAllAnswers(userId)

      if (getAllAnswersResult.error) {
        next(getAllAnswersResult)
      } else {
        console.log('Got answers:', getAllAnswersResult)
        res.status(200).json({ data: getAllAnswersResult.data })
      }
    }
  } catch (err) {
    console.error('Error getting answers:', err)
    next(err)
  }
}
// Add answer
export const addAnswerHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const addAnswerResult = await addAnswer({
      name: req.body.name,
      question_id: req.body.questionId,
      correct: req.body.isCorrect,
    })

    if (addAnswerResult.error) {
      console.log('ERROR:', addAnswerResult)
      return next(addAnswerResult)
    }
    res
      .status(201)
      .json({ message: 'Answer added successfully', id: addAnswerResult.data })
  } catch (err) {
    console.error('Error adding answer:', err)
    next(err)
  }
}
// Update answer
export const updateAnswerHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    console.log('BODY:', req.body)
    const updateAnswerResult = await updateAnswer({
      ...req.body,
      userId: req.user.id,
    })

    if (updateAnswerResult.error) return next(updateAnswerResult)
    res.status(201).json({ message: 'Answer updated successfully' })
  } catch (err) {
    console.error('Error updating answer:', err)
    next(err)
  }
}
// Delete answer
export const deleteAnswerHandler = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    const deleteAnswerResult = await deleteAnswer({
      id: parseInt(req.params.id),
      userId: req.user.id,
    })
    if (deleteAnswerResult.error) return next(deleteAnswerResult)
    res.status(200).json({ message: 'Answer deleted successfully' })
  } catch (err) {
    console.error('Error deleting answer:', err)
    next(err)
  }
}
