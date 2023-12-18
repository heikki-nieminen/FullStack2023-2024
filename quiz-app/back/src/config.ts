require('dotenv').config()

export const PORT = process.env.PORT
export const SECRET = process.env.SECRET || 'Testi'
export const SALT_ROUNDS = process.env.SALT_ROUNDS
export const ADMIN_SECRET = process.env.ADMIN_SECRET || 'TestiAdmin'
