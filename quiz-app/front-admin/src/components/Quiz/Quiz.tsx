import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../state/hooks'
import {
  deleteQuiz,
  editQuiz,
  selectQuizById,
} from '../../state/reducers/quizSlice'
import { NotFound } from '../NotFound'
import { selectQuestionsByQuizId } from '../../state/reducers/questionSlice'
import { Typography, Container, Box, OutlinedInput } from '@mui/material'
import { Question } from '../Question/Question'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { useState, SyntheticEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { NewQuestion } from './NewQuestion'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import axios from 'axios'
/* import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../state/store'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux' */
/* import {
  fetchAnswers,
  fetchQuestions,
  fetchQuizzes,
} from '../../state/reducers/utils' */

// Fetch only specific quiz if required!!!!

export const Quiz = () => {
  //const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch()
  const [open, setOpen] = useState(false)
  const [editQuizName, setEditQuizName] = useState(false)
  const dispatch = useAppDispatch()
  const { id } = useParams() as { id: string }
  console.log('ID:', id)
  //dispatch(fetchQuizById(id))
  const quiz = useAppSelector(selectQuizById(id))
  console.log('Quiz:', quiz)
  const [quizName, setQuizName] = useState<string | null>(null)
  console.log('quizName:', quiz?.name)
  const questions = useAppSelector(selectQuestionsByQuizId(id))
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState<string | false>(false)
  //const questions = useAppSelector(selectQuestionsByQuizId(id))
  /* useEffect(() => {
    if (quiz) {
      setQuizName(quiz.name)
    }

    const testi = async () => {
      const response = await axios({
        method: 'GET',
        url: `get-quiz/${id}`,
      })
      console.log('Response.data:', response.data)
    }
    testi()
  }, [quiz]) */
  console.log('RENDER')
  useEffect(() => {
    if (quiz) {
      setQuizName(quiz.name)
    }
  }, [quiz])

  console.log('Questions:', questions)

  const handleQuizDelete = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `${
          import.meta.env.VITE_BACKEND_API_ADDRESS
        }/api/admin/delete-quiz/${quiz?.id}`,
      })
      dispatch(deleteQuiz(quiz?.id))
      navigate('/quizzes')
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleQuizUpdate = async () => {
    console.log('Updating quiz')
    console.log('Updating: ', quiz?.id)
    try {
      await axios({
        method: 'PUT',
        url: `${
          import.meta.env.VITE_BACKEND_API_ADDRESS
        }/api/admin/update-quiz/${quiz?.id}`,
        data: { name: quizName },
      })
      dispatch(editQuiz({ id: quiz?.id, name: quizName }))
    } catch (err) {
      console.log('Error:', err)
    }
    setEditQuizName(false)
  }

  const handleAccordionChange =
    (panel: string) => (_: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false)
    }

  if (quiz === undefined) {
    return <NotFound />
  }

  return (
    <Container sx={{ mt: '2rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        {!editQuizName ? (
          <>
            <Typography
              variant='h3'
              sx={{ cursor: 'pointer' }}
              onClick={() => setEditQuizName(true)}
            >
              {quiz.name}
            </Typography>
            <DeleteIcon
              sx={{ fontSize: '3rem', cursor: 'pointer' }}
              onClick={handleQuizDelete}
            />
          </>
        ) : (
          <>
            <OutlinedInput
              id={'quiz-name'}
              name={'quiz-name'}
              autoFocus={true}
              required={true}
              fullWidth={true}
              sx={{ mb: '1rem', backgroundColor: 'white', fontSize: 30 }}
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              onBlur={handleQuizUpdate}
            />
            <CheckIcon
              sx={{ fontSize: '3rem', cursor: 'pointer' }}
              onClick={handleQuizUpdate}
            />
          </>
        )}
      </Box>
      {questions.map((question, index) => (
        <Question
          question={question}
          key={question.id}
          index={index}
          handleAccordionChange={handleAccordionChange}
          expanded={expanded}
        />
      ))}
      <AddCircleIcon
        sx={{ fontSize: '5rem', cursor: 'pointer' }}
        onClick={() => setOpen(true)}
      />
      <NewQuestion open={open} setOpen={setOpen} quizId={quiz.id} />
    </Container>
  )
}
