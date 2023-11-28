import { useEffect, useState } from 'react'
import { useAppSelector } from '../../state/hooks'
import { selectQuizzes, selectStatus } from '../../state/reducers/quizSlice'
import { Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { NewQuiz } from './NewQuiz'
import { useDispatch } from 'react-redux'
import {
  fetchAnswers,
  fetchQuestions,
  fetchQuizzes,
} from '../../state/reducers/utils'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../state/store'
import { AnyAction } from '@reduxjs/toolkit'

export const Quizzes = () => {
  const quizzes = useAppSelector(selectQuizzes)
  const status = useAppSelector(selectStatus)
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch()
  // Fetch quizzes
  useEffect(() => {
    dispatch(fetchQuizzes())
    dispatch(fetchQuestions())
    dispatch(fetchAnswers())
  }, [dispatch])
  const [open, setOpen] = useState<boolean>(false)

  if (status === 'succeeded') {
    return (
      <Container sx={{ display: 'flex', flexDirection: 'column' }}>
        {quizzes.map((quiz) => (
          <Typography
            variant='h3'
            key={quiz.id}
            component={Link}
            to={`/quiz/${quiz.id}`}
            sx={{ textDecoration: 'none', width: 'fit-content' }}
          >
            {quiz.name}
          </Typography>
        ))}
        <AddCircleIcon
          sx={{ fontSize: '5rem', cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        />
        <NewQuiz open={open} setOpen={setOpen} />
      </Container>
    )
  } else if (status === 'failed') {
    return <>Error</>
  } else {
    return <>Loading...</>
  }
}
