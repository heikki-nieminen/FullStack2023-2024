import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ADMIN_SECRET } from '../config'
import { prisma } from './prisma'

// Authentication
export const registerAdmin = async (data: {
  username: string
  password: string
}) => {
  try {
    const response = await prisma.user.create({
      data: { ...data, is_admin: true },
    })
    console.log('Account created')
    return { error: false, message: 'ok', data: response }
  } catch (err) {
    console.log('Tässä:', err)
    return { error: true, message: err }
  }
}

export const loginAdmin = async (data: {
  username: string
  password: string
}) => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        username: data.username,
        is_admin: true,
      },
    })
    if (response) {
      const compare = await bcrypt.compare(data.password, response.password)
      console.log('response:', response)
      if (compare) {
        const token = jwt.sign(
          { id: response.id, username: data.username },
          ADMIN_SECRET,
          {
            algorithm: 'HS256',
            expiresIn: '30d',
          }
        )
        return { error: false, message: 'ok', data: { token: token } }
      }
      console.log('Compare:', compare)
      return {
        error: true,
        message: 'Wrong username or password',
        type: 'wrong_user_or_pass',
      }
    }
    return {
      error: true,
      message: 'Wrong username or password',
      type: 'wrong_user_or_pass',
    }
  } catch (err) {
    console.log('Tässä:', err)
    return { error: true, message: err }
  }
}

// Quiz related
// Get quizzes with creator id
export const getAllQuizzes = async (id: number) => {
  console.log('Getting quizzes')
  try {
    const quizzes = await prisma.quiz.findMany({
      where: {
        creator_id: id,
      },
    })
    console.log('Quizzes:', quizzes)
    return { error: false, message: 'ok', data: quizzes }
  } catch (err) {
    return { error: true, message: err }
  }
}

// Add quiz
export const addQuiz = async (data: { name: string; creator_id: number }) => {
  try {
    const response = await prisma.quiz.create({
      data: data,
    })
    return { error: false, message: 'ok', data: response.id }
  } catch (err) {
    return { error: true, message: err }
  }
}

// Update quiz
export const updateQuiz = async (data: {
  id: number
  name: string
  userId: number
}) => {
  try {
    await prisma.quiz.update({
      where: {
        id: data.id,
        creator_id: data.userId,
      },
      data: { name: data.name },
    })
    return { error: false }
  } catch (err) {
    return { error: true, message: err }
  }
}

// Delete quiz
export const deleteQuiz = async (data: { id: number; userId: number }) => {
  try {
    await prisma.quiz.delete({
      where: {
        id: data.id,
        creator_id: data.userId,
      },
    })
    return { error: false }
  } catch (err) {
    return { error: true, message: err }
  }
}

// Question related
// Fetch creator related questions
export const getAllQuestions = async (id: number) => {
  try {
    const questions = await prisma.question.findMany({
      where: {
        parent_quiz: {
          creator_id: id,
        },
      },
      orderBy: { id: 'asc' },
    })
    const translatedQuestions = questions.map((question) => {
      return { id: question.id, name: question.name, quizId: question.quiz_id }
    })
    return { error: false, data: translatedQuestions }
  } catch (err) {
    return { error: true, message: err }
  }
}
// Add question
export const addQuestion = async (data: { name: string; quiz_id: number }) => {
  try {
    const response = await prisma.question.create({
      data: data,
    })
    return { error: false, data: response.id }
  } catch (err) {
    return { error: true, message: err }
  }
}
// Update question
export const updatedQuestion = async (data: {
  id: number
  name: string
  quiz_id: number
  userId: number
}) => {
  try {
    await prisma.question.update({
      where: { id: data.id, parent_quiz: { creator_id: data.userId } },
      data: { name: data.name },
    })
    return { error: false }
  } catch (err) {
    return { error: true, message: err }
  }
}
// Delete question
export const deleteQuestion = async (data: { id: number; userId: number }) => {
  try {
    await prisma.question.delete({
      where: {
        id: data.id,
        parent_quiz: { creator_id: data.userId },
      },
    })
    return { error: false }
  } catch (err) {
    return { error: true, message: err }
  }
}

// Answer related
// Fetch creator relates answers
export const getAllAnswers = async (id: number) => {
  try {
    const answers = await prisma.answer.findMany({
      where: {
        parent_question: {
          parent_quiz: {
            creator_id: id,
          },
        },
      },
      orderBy: { id: 'asc' },
    })
    const translatedAnswers = answers.map((answer) => {
      return {
        id: answer.id,
        name: answer.name,
        isCorrect: answer.correct,
        questionId: answer.question_id,
      }
    })
    return { error: false, message: 'ok', data: translatedAnswers }
  } catch (err) {
    return { error: true, message: err }
  }
}
// Add answer
export const addAnswer = async (data: {
  name: string
  question_id: number
  correct: boolean
}) => {
  try {
    const response = await prisma.answer.create({
      data: data,
    })
    return { error: false, message: 'ok', data: response.id }
  } catch (err) {
    return { error: true, message: err }
  }
}
// Update answer
export const updateAnswer = async (data: {
  id: number
  name: string
  correct: boolean
  question_id: number
  userId: number
}) => {
  try {
    await prisma.answer.update({
      where: {
        id: data.id,
        parent_question: {
          parent_quiz: {
            creator_id: data.userId,
          },
        },
      },
      data: {
        name: data.name,
        correct: data.correct,
      },
    })
    return { error: false, message: 'ok' }
  } catch (err) {
    return { error: true, message: err }
  }
}
// Delete answer
export const deleteAnswer = async (data: { id: number; userId: number }) => {
  try {
    await prisma.answer.delete({
      where: {
        id: data.id,
        parent_question: {
          parent_quiz: {
            creator_id: data.userId,
          },
        },
      },
    })
    return { error: false, message: 'ok' }
  } catch (err) {
    return { error: true, message: err }
  }
}
// User related
// Get users
export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    })
    return { error: false, message: 'ok', data: users }
  } catch (err) {
    return { error: true, message: err }
  }
}
// Assign quiz to user
export const assignQuizToUser = async (quizId: number, userId: number) => {
  try {
    await prisma.quizUser.create({
      data: {
        quiz_id: quizId,
        user_id: userId,
      },
    })
    return { error: false, message: 'ok' }
  } catch (err) {
    return { error: true, message: err }
  }
}
