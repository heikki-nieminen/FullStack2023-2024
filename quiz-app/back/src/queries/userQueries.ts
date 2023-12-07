import { v4 as uuidv4 } from 'uuid'
import { readDataFromFile, saveDataToFile } from '../utils/util'
import { User } from '../types'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET } from '../config'

export const registerUser = async (userData: {
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
}
