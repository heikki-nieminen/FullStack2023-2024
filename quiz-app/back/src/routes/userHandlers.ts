import { loginUser, registerUser } from '../queries/userQueries'
import { RouteHandler } from '../types'
import { RequestWithUser, hashPassword } from '../utils/authentication'

// Login handler
export const loginHandler: RouteHandler = async (req, res, next) => {
  try {
    const userData = req.body
    const loginUserResult = await loginUser(userData)
    console.log('userData:', userData)
    if (loginUserResult.error) return next(loginUserResult)
    console.log('TOimiiko??')
    res.status(200).json({ token: loginUserResult.data?.token })
  } catch (error) {
    console.error('Login error:', error)
    next(error)
  }
}

// Register handler
export const registerHandler: RouteHandler = async (req, res, next) => {
  try {
    const userData = req.body
    console.log('Userdata:', userData)
    const hashedPassword = await hashPassword(userData.password)
    userData.password = hashedPassword
    const registerUserResult = await registerUser(userData)
    if (registerUserResult?.error) return next(registerUserResult)
    console.log('Testi')
    // Login user and get token
    const loginUserResult = await loginUser(userData)
    if (loginUserResult?.error) return next(loginUserResult)
    console.log('TOimiiko??')
    res.status(200).json({ token: loginUserResult.data?.token })
  } catch (error) {
    console.error('Register error:', error)
    next(error)
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
    next(error)
  }
}
