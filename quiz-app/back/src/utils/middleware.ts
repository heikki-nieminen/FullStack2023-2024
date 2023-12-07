import { Request, Response, NextFunction } from 'express'
import { Error } from '../types'

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Error: ', err)
  switch (err.type) {
    default: {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
