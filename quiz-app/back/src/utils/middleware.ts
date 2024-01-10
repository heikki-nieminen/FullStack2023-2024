import { Request, Response, NextFunction } from 'express'
import { Error } from '../types'

export const errorHandler = (
  err: Error,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  console.log('Error: ', err)
  switch (err.type) {
    case 'wrong_user_or_pass': {
      return res.status(401).json({ message: 'Wrong username or password' })
    }
    default: {
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  }
}
