import { Request, Response, NextFunction } from 'express'

export type Question = {
  id: string
  name: string
  quizId: string
}

export type Answer = {
  id: string
  name: string
  questionId: string
  isCorrect: boolean
}

export type Quiz = {
  id: string
  name: string
}

export type Error = {
  type: string
  message: string
  code: number
}
export type RouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>

export type User = {
  id: string
  username: string
  password: string
}
