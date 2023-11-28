import express, { Request, Response } from 'express'
import fs from 'fs/promises'
import bodyParser from 'body-parser'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const app = express()
const port = 3001

app.use(bodyParser.json())
app.use(cors())

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

app.post('/addQuiz', async (req: Request, res: Response) => {
  try {
    const newQuiz = req.body
    const newQuizId = uuidv4()
    newQuiz.id = newQuizId
    const existingQuizzes = await readDataFromFile('json/quiz.json')
    const updatedQuizzes = [...existingQuizzes, newQuiz]
    await saveDataToFile('json/quiz.json', updatedQuizzes)
    res.status(200).json({ message: 'Quiz added succesfully', id: newQuizId })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

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
    const existingQuizzes = await readDataFromFile('json/question.json')
    const updatedQuizzes = [...existingQuizzes, newQuestion]
    await saveDataToFile('json/question.json', updatedQuizzes)
    res
      .status(200)
      .json({ message: 'Question added succesfully', data: newQuestionId })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/addAnswer', async (req: Request, res: Response) => {
  try {
    const newQuiz = req.body
    const newQuizId = uuidv4()
    newQuiz.id = newQuizId
    const existingQuizzes = await readDataFromFile('json/answer.json')
    const updatedQuizzes = [...existingQuizzes, newQuiz]
    await saveDataToFile('json/answer.json', updatedQuizzes)
    res.status(200).json({ message: 'Answer added succesfully' })
  } catch (err) {
    console.log('Error:', err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

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
