//import './App.css'
import { NavBar } from './components/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './components/Home/Home'
import { Quizzes } from './components/Quizzes/Quizzes'
import { NotFound } from './components/NotFound'
import { Quiz } from './components/Quiz/Quiz'

export const App = () => {
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
