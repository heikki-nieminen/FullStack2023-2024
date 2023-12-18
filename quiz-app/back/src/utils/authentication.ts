import bcrypt from 'bcrypt'
import { ADMIN_SECRET, SALT_ROUNDS, SECRET } from '../config'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

interface User {
  id: number
  username: string
}

type UserAuthMiddleware = RequestHandler<
  Record<string, never>,
  any,
  any,
  Record<string, never>,
  Partial<RequestWithUser>
>

export interface RequestWithUser extends Request {
  user?: User
}

const getTokenFromHeaders = async (req: Request) => {
  if (req.headers.authorization) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

const checkAuth =
  (secret: string): UserAuthMiddleware =>
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const token = await getTokenFromHeaders(req)
      console.log('TOKEN:', token)
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' })
      }
      try {
        const user = jwt.verify(token, secret) as User
        console.log('User:', user)
        req.user = { username: user.username, id: user.id }
      } catch (err) {
        console.log('Error validating token')
        return res.status(403).json({ error: 'Access denied' })
      }
    } catch (err) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    req.user = req.user ?? {}
    return next()
  }

export const auth = {
  userAuth: checkAuth(SECRET),
  adminAuth: checkAuth(ADMIN_SECRET),
}

export const hashPassword = async (plainPassword: string) => {
  return await bcrypt.hash(plainPassword, Number(SALT_ROUNDS))
}
