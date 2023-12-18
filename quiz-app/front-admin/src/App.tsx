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
import { loginUser, loginAdmin, selectUser } from './state/reducers/userSlice'
import axios from 'axios'

export const App = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch()
  const user = useAppSelector(selectUser)
  // Fetch data and check localStorage for token
  useEffect(() => {
    const checkTokens = async () => {
      const token = localStorage.getItem('userToken')
      const adminToken = localStorage.getItem('adminToken')
      console.log('Checking token:', token)
      if (adminToken) {
        axios.defaults.headers.common['Authorization'] = `Token ${adminToken}`
        try {
          console.log('Trying to verify token')
          const response = await axios({
            method: 'GET',
            url: 'http://localhost:3001/admin/verify-token',
          })
          console.log('Token verification response:', response)

          if (response) {
            dispatch(
              loginAdmin({
                username: response.data.data.username,
                token: adminToken,
              })
            )
            console.log('Successfully verified token')
            dispatch(fetchQuizzes())
            console.log('Trying to get quizzes')
            dispatch(fetchQuestions())
            dispatch(fetchAnswers())
          }
        } catch (err) {
          localStorage.removeItem('adminToken')
          console.log('Error validating token:', err)
        }
      } else if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`
        try {
          console.log('Trying to verify token')
          const response = await axios({
            method: 'GET',
            url: 'http://localhost:3001/verify-token',
          })
          console.log('Token verification response:', response)

          if (response) {
            dispatch(
              loginUser({
                username: response.data.data.username,
                token: token,
              })
            )
            console.log('Successfully verified token')
            dispatch(fetchQuizzes())
            console.log('Trying to get quizzes')
            // dispatch(fetchQuestions());
            // dispatch(fetchAnswers());
          }
        } catch (err) {
          localStorage.removeItem('userToken')
          console.log('Error validating token:', err)
        }
      }
    }
    checkTokens()
  }, [dispatch])

  useEffect(() => {
    if (user.token) {
      if (user.isAdmin) {
        localStorage.setItem('adminToken', user.token)
        return
      }
      localStorage.setItem('userToken', user.token)
    }
  }, [user.token, user.isAdmin])

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
