export interface User {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterResponse {
  token: string
}

export interface UserState {
  username: string | null
  token: string | null
  loggedIn: boolean
}

export interface Answer {
  id: number
  name: string
}

export interface Question {
  id: number
  name: string
  answers: Answer[]
}

export interface Quiz {
  id: number | null
  name: string | null
  questions: Question[] | null
}
