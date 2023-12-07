//import './App.css'
import { NavBar } from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { Quizzes } from './components/Quizzes/Quizzes'
import { NotFound } from './components/NotFound'
import { Quiz } from './components/Quiz/Quiz'
import { useDispatch } from 'react-redux'
import {
  fetchAnswers,
  fetchQuestions,
  fetchQuizzes,
} from './state/reducers/utils'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from './state/store'
import { AnyAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useAppSelector } from './state/hooks'
import { loginUser, selectUser } from './state/reducers/userSlice'
import axios from 'axios'

export const App = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch()
  const user = useAppSelector(selectUser)
  // Fetch data and check localStorage for token
  useEffect(() => {
    dispatch(fetchQuizzes())
    dispatch(fetchQuestions())
    dispatch(fetchAnswers())

    const checkUserToken = async () => {
      // Validate usertoken if found
      const token = localStorage.getItem('userToken')
      if (token) {
        //Validate token here
        axios.defaults.headers.common['Authorization'] = `Token ${token}`
        try {
          const response = await axios({
            method: 'GET',
            url: 'http://localhost:3001/verifyToken',
          })
          console.log(response)
          if (response) {
            dispatch(
              loginUser({ username: response.data.data.username, token: token })
            )
          }
        } catch (err) {
          localStorage.removeItem('userToken')
          console.log('Error validating token:', err)
        }
      }
    }
    checkUserToken()
  }, [dispatch])

  useEffect(() => {
    if (user.token) {
      localStorage.setItem('userToken', user.token)
    }
  }, [user.token])

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='quizzes' element={<Quizzes />} />
        <Route path='/quiz/:id' element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  )
}
