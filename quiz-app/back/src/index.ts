import express, { Request, Response } from 'express'
import fs from 'fs/promises'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'
import { Answer, Question, Quiz } from './types'
import { PORT } from './config'
import { errorHandler } from './utils/middleware'
import { userRouter } from './routes/userRouter'
import { adminRouter } from './routes/adminRouter'
import { auth } from './utils/authentication'

const app = express()
const port = PORT

app.use(bodyParser.json())
app.use(cors())
app.use('/', userRouter)
app.use('/admin/', adminRouter)
app.use(errorHandler)

app.get('/getQuizzes', async (_, res: Response) => {
  try {
    const data = await readDataFromFile('json/quiz.json')
    console.log('DATA:', data)
    res.status(200).json({ data: data }).end()
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.get('/getQuestions', async (_, res: Response) => {
  try {
    const data = await readDataFromFile('json/question.json')
    res.status(200).json({ data: data }).end()
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.get('/getAnswers', async (_, res: Response) => {
  try {
    const data = await readDataFromFile('json/answer.json')
    res.status(200).json({ data: data }).end()
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.post('/addQuiz', auth.userAuth, async (req: Request, res: Response) => {
  try {
    const newQuiz = req.body
    const newQuizId = uuidv4()
    newQuiz.id = newQuizId
    const existingQuizzes = await readDataFromFile('json/quiz.json')
    const updatedQuizzes = [...existingQuizzes, newQuiz]
    await saveDataToFile('json/quiz.json', updatedQuizzes)
    res.status(201).json({ message: 'Quiz added succesfully', id: newQuizId })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.put('/editQuiz/:id', auth.userAuth, async (req: Request, res: Response) => {
  console.log('Editing quiz')
  try {
    const quizzes = await readDataFromFile('json/quiz.json')
    const updatedQuizzes = quizzes.map((quiz: Quiz) =>
      quiz.id === req.params.id ? { ...quiz, name: req.body.name } : quiz
    )
    await saveDataToFile('json/quiz.json', updatedQuizzes)
    res.status(201).json({ message: 'Quiz edited succesfully' }).end()
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' }).end()
  }
})
app.delete(
  '/deleteQuiz/:id',
  auth.userAuth,
  async (req: Request, res: Response) => {
    try {
      const quizzes = await readDataFromFile('json/quiz.json')
      const updatedQuizzes = quizzes.filter(
        (quiz: Quiz) => quiz.id !== req.params.id
      )
      await saveDataToFile('json/quiz.json', updatedQuizzes)
      res.status(201).json({ message: 'Quiz deleted succesfully' })
    } catch (err) {
      console.log('Error:', err)
      res.status(500).json({ message: 'Internal server error' })
    }
  }
)
app.get('/getQuiz/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const quizzes = await readDataFromFile('json/quiz.json')
    const result = quizzes.filter((quiz: { id: string }) => quiz.id === id)
    res.status(200).json({ message: 'Quiz found', quiz: result })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.post('/addQuestion', async (req: Request, res: Response) => {
  try {
    const newQuestion = req.body
    const newQuestionId = uuidv4()
    newQuestion.id = newQuestionId
    const existingQuestions = await readDataFromFile('json/question.json')
    const updatedQuestions = [...existingQuestions, newQuestion]
    await saveDataToFile('json/question.json', updatedQuestions)
    res
      .status(201)
      .json({ message: 'Question added succesfully', id: newQuestionId })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.put('/editQuestion/:id', async (req: Request, res: Response) => {
  try {
    console.log('Trying to edit question')
    const editedQuestion = { ...req.body, id: req.params.id }
    console.log('EditedQuestion:', editedQuestion)
    const existingQuestions = await readDataFromFile('json/question.json')
    const updatedQuestions = existingQuestions.map((question: Question) =>
      question.id === req.params.id ? editedQuestion : question
    )
    await saveDataToFile('json/question.json', updatedQuestions)
    res.status(201).json({ message: 'Question edited succesfully' })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.delete('/deleteQuestion/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    console.log('Deleting question:', id)
    const questions = await readDataFromFile('json/question.json')
    const newQuestions = questions.filter(
      (question: Question) => question.id !== id
    )
    await saveDataToFile('json/question.json', newQuestions)
    // Delete related answers??
    const answers = await readDataFromFile('json/answer.json')
    const newAnswers = answers.filter(
      (answer: Answer) => answer.questionId !== id
    )
    await saveDataToFile('json/answer.json', newAnswers)
    res.status(200).json({ message: 'Question and related answers deleted' })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.post('/addAnswer', async (req: Request, res: Response) => {
  try {
    const newAnswer = req.body
    const newAnswerId = uuidv4()
    newAnswer.id = newAnswerId
    const existingAnswers = await readDataFromFile('json/answer.json')
    const updatedAnswers = [...existingAnswers, newAnswer]
    await saveDataToFile('json/answer.json', updatedAnswers)
    res
      .status(201)
      .json({ message: 'Answer added succesfully', id: newAnswerId })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.put('/editAnswer/:id', async (req: Request, res: Response) => {
  try {
    const editedAnswer = req.body
    const existingAnswers = await readDataFromFile('json/answer.json')
    const updatedAnswers = existingAnswers.map((answer: Answer) =>
      answer.id === req.params.id ? editedAnswer : answer
    )
    await saveDataToFile('json/answer.json', updatedAnswers)
    res.status(201).json({ message: 'Answer edited succesfully' })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})
app.delete('/deleteAnswer/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    console.log('Deleting answer:', id)
    const answers = await readDataFromFile('json/answer.json')
    const result = answers.filter((answer: { id: string }) => answer.id !== id)
    await saveDataToFile('json/answer.json', result)
    res.status(200).json({ message: 'Answer deleted' })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Authentication
app.post('/register', async (req: Request, res: Response) => {})
app.post('/login', async (req: Request, res: Response) => {})

const readDataFromFile = async (file: string) => {
  try {
    const data = await fs.readFile(file, 'utf-8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

const saveDataToFile = async (file: string, data: any[]) => {
  const stringifiedData = JSON.stringify(data, null, 2)

  try {
    await fs.writeFile(file, stringifiedData)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(file, { recursive: true })
      await fs.writeFile(file, stringifiedData)
    } else {
      throw error
    }
  }
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
