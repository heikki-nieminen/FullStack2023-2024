import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'
import { prisma } from './prisma'

/* export const registerUser = async (userData: {
  username: string
  password: string
}) => {
  try {
    const id = uuidv4()
    const existingUsers = await readDataFromFile('json/user.json')
    const doesUserExist = existingUsers.some(
      (user: User) => user.username === userData.username
    )
    if (doesUserExist) return { error: true, type: 'user_already_exists' }
    const updatedUsers = [...existingUsers, { ...userData, id: id }]
    await saveDataToFile('json/user.json', updatedUsers)
  } catch (err) {
    console.log('Tässä:', err)
    return { error: true, message: err }
  }
}

export const loginUser = async (userData: {
  username: string
  password: string
}) => {
  try {
    const users = await readDataFromFile('json/user.json')
    const doesUserExist = users.some(
      (user: User) => user.username === userData.username
    )
    if (doesUserExist) {
      const user = users.filter(
        (user: User) => user.username === userData.username
      )[0]
      const compare = await bcrypt.compare(userData.password, user.password)
      console.log('2')
      if (compare) {
        const token = jwt.sign({ username: userData.username }, SECRET, {
          algorithm: 'HS256',
          expiresIn: '30d',
        })
        return { error: false, data: { token: token } }
      }
    }
    return { error: true, type: 'wrong_username_or_password' }
  } catch (err) {
    console.log('Error:', err)
    return { error: true, message: err }
  }
} */

// Prisma queries

// User related
export const registerUser = async (data: {
  username: string
  password: string
}) => {
  try {
    const response = await prisma.user.create({
      data: data,
    })
    console.log('Account created')
    return { error: false, message: 'ok', data: response }
  } catch (err) {
    console.log('Tässä:', err)
    return { error: true, message: err }
  }
}

export const loginUser = async (data: {
  username: string
  password: string
}) => {
  try {
    const response = await prisma.user.findUnique({
      where: {
        username: data.username,
      },
    })
    if (response) {
      const compare = await bcrypt.compare(data.password, response.password)
      console.log('response:', response)
      if (compare) {
        const token = jwt.sign(
          { id: response.id, username: data.username },
          SECRET,
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
    return { error: true, message: err }
  }
}

// Quiz related
export const getAllQuizzes = async (userId: number) => {
  console.log('Getting quizzes')
  try {
    const quizzes = await prisma.quizUser.findMany({
      where: {
        user_id: userId,
      },
      include: {
        quiz: true,
      },
    })
    return { error: false, data: quizzes }
  } catch (err) {
    return { error: true, message: err }
  }
}

export const getQuiz = async (quizId: number) => {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      select: {
        id: true,
        name: true,
        Question: {
          select: {
            id: true,
            name: true,
            Answer: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    })
    return { error: false, data: quiz }
  } catch (err) {
    return { error: true, message: err }
  }
}

export const addQuiz = async (data: { name: string; creator_id: number }) => {
  try {
    const response = await prisma.quiz.create({
      data: data,
    })
    return { error: false, data: response.id }
  } catch (err) {
    return { error: true, message: err }
  }
}

export const updateQuiz = async (data: {
  id: number
  name: string
  creator_id: number
}) => {
  try {
    await prisma.quiz.update({
      where: {
        id: data.id,
      },
      data: data,
    })
    return { error: false, message: 'ok' }
  } catch (err) {
    return { error: true, message: err }
  }
}

export const deleteQuiz = async (id: number) => {
  try {
    await prisma.quiz.delete({
      where: {
        id: id,
      },
    })
    return { error: false, message: 'ok' }
  } catch (err) {
    return { error: true, message: err }
  }
}

// Question related
export const getAllQuestions = async () => {
  try {
    const questions = await prisma.question.findMany()
    return { error: false, message: 'ok', data: questions }
  } catch (err) {
    return { error: true, message: err }
  }
}

export const getQuestionsByQuizId = async (id: number) => {
  try {
    const questions = await prisma.question.findMany({
      where: {
        quiz_id: id,
      },
    })
    return { error: false, message: 'ok', data: questions }
  } catch (err) {
    return { error: true, message: err }
  }
}

export const addQuestion = async (data: { name: string; quiz_id: number }) => {
  try {
    const response = await prisma.question.create({
      data: data,
    })
    return { error: false, message: 'ok', data: response.id }
  } catch (err) {
    return { error: true, message: err }
  }
}

export const updatedQuestion = async (data: {
  id: number
  name: string
  quiz_id: number
}) => {
  try {
    await prisma.question.update({
      where: {
        id: data.id,
      },
      data: data,
    })
    return { error: false, message: 'ok' }
  } catch (err) {
    return { error: true, message: err }
  }
}

export const deleteQuestion = async (id: number) => {
  try {
    await prisma.question.delete({
      where: {
        id: id,
      },
    })
    return { error: false, message: 'ok' }
  } catch (err) {
    return { error: true, message: err }
  }
}

// Answer related
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

export const updateAnswer = async (data: {
  id: number
  name: string
  question_id: number
  correct: boolean
}) => {
  try {
    await prisma.answer.update({
      where: {
        id: data.id,
      },
      data: data,
    })
    return { error: false, message: 'ok' }
  } catch (err) {
    return { error: true, message: err }
  }
}

export const deleteAnswer = async (id: number) => {
  try {
    await prisma.answer.delete({
      where: {
        id: id,
      },
    })
    return { error: false, message: 'ok' }
  } catch (err) {
    return { error: true, message: err }
  }
}
