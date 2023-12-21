import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { getLoggedIn } from '../../state/reducers/userSlice'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../state/hooks'

export const Home = () => {
  const navigate = useNavigate()
  const isLoggedIn = useAppSelector(getLoggedIn)
  useEffect(() => {
    if (!isLoggedIn)
      return () => {
        navigate('/register')
      }
  }, [isLoggedIn, navigate])

  return <Typography>Home page</Typography>
}
