import './App.css'
import { Home } from './components/Home/Home'
import { Login } from './components/Login/Login'
import { NotFound } from './components/NotFound/NotFound'
import { Register } from './components/Register/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
          <Route index element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
