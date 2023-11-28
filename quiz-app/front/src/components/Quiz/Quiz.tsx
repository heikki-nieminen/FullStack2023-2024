import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../state/hooks'
import { selectQuizById } from '../../state/reducers/quizSlice'
import { NotFound } from '../NotFound'
import { selectQuestionsByQuizId } from '../../state/reducers/questionSlice'
import { Typography, Container } from '@mui/material'
import { Question } from '../Question/Question'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useState, useEffect } from 'react'
import { NewQuestion } from './NewQuestion'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../state/store'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import {
  fetchAnswers,
  fetchQuestions,
  fetchQuizzes,
} from '../../state/reducers/utils'

export const Quiz = () => {
  const [open, setOpen] = useState(false)
  const { id } = useParams() as { id: string }
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch()
  const quiz = useAppSelector(selectQuizById(id))
  const questions = useAppSelector(selectQuestionsByQuizId(id))
  useEffect(() => {
    dispatch(fetchQuizzes())
    dispatch(fetchQuestions())
    dispatch(fetchAnswers())
  }, [dispatch])
  console.log('Quiz:', quiz)
  if (quiz === undefined) {
    return <NotFound />
  }

  return (
    <Container sx={{ mt: '2rem' }}>
      <Typography variant='h3'>
        {quiz.name} - {quiz.id}
      </Typography>
      {questions.map((question) => (
        <Question question={question} />
      ))}
      <AddCircleIcon
        sx={{ fontSize: '5rem', cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      />
      <NewQuestion open={open} setOpen={setOpen} quizId={quiz.id} />
    </Container>
  )
}
