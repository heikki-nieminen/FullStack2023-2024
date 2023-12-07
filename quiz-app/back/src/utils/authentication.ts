import bcrypt from 'bcrypt'
import { SALT_ROUNDS, SECRET } from '../config'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface User {
  username: string
}

export interface RequestWithUser extends Request {
  user?: User
}

const getTokenFromHeaders = async (req: Request) => {
  if (req.headers.authorization) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

const checkUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = await getTokenFromHeaders(req)
    if (token) {
      try {
        const user = jwt.verify(token, SECRET) as User
        req.user = { username: user.username }
        next()
      } catch (err) {
        console.log('Error validating token')
        return res.status(403).json({ error: 'Access denied' })
      }
    } else {
      console.log('Token not found')
      return res.status(401).json({ error: 'Unauthorized' })
    }
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export const auth = {
  userAuth: checkUser,
}

export const hashPassword = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, Number(SALT_ROUNDS))
}
