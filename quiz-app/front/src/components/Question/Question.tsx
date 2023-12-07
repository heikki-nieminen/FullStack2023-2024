import {
  QuestionType,
  deleteQuestion,
  editQuestion,
} from '../../state/reducers/questionSlice'
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  TextField,
} from '@mui/material'
import { FC, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useAppSelector } from '../../state/hooks'
import {
  deleteAnswersByQuestionId,
  selectAnswersByQuestionId,
} from '../../state/reducers/answerSlice'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Answer } from '../Answer/Answer'
import { NewAnswer } from './NewAnswer'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import { useAppDispatch } from '../../state/store'

interface QuestionProps {
  question: QuestionType
}

export const Question: FC<QuestionProps> = ({ question }) => {
  const answers = useAppSelector(selectAnswersByQuestionId(question.id))
  const [open, setOpen] = useState(false)
  const [accordionOpen, setAccordionOpen] = useState(false)
  const [questionName, setQuestionName] = useState(question.name)
  const dispatch = useAppDispatch()

  const handleQuestionDelete = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `http://localhost:3001/deleteQuestion/${question.id}`,
      })
      dispatch(deleteQuestion(question.id))
      dispatch(deleteAnswersByQuestionId(question.id))
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleQuestionUpdate = async () => {
    try {
      await axios({
        method: 'PUT',
        url: `http://localhost:3001/editQuestion/${question.id}`,
        data: { ...question, name: questionName },
      })
      dispatch(editQuestion({ ...question, name: questionName }))
    } catch (err) {
      console.log('Error:', err)
    }
  }

  //Maybe save here on close?
  /* const handleAccordion = () => {
    if(accordionOpen){
      // Save question and answers??
    }
    setAccordionOpen(!accordionOpen)
  } */

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
          onClick={() => setAccordionOpen(!accordionOpen)}
        >
          {accordionOpen ? (
            <TextField
              value={questionName}
              variant='standard'
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => setQuestionName(e.target.value)}
              onBlur={handleQuestionUpdate}
            />
          ) : (
            <Typography variant='h5'>{question.name}</Typography>
          )}
        </AccordionSummary>
        <AccordionDetails>
          {answers.map((answer) => (
            <Answer answer={answer} key={answer.id} />
          ))}
          <Box
            m={0}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <AddCircleIcon
              sx={{ fontSize: '3rem', cursor: 'pointer' }}
              onClick={() => setOpen(true)}
            />
            <DeleteIcon
              sx={{ fontSize: '3rem', cursor: 'pointer' }}
              onClick={handleQuestionDelete}
            />
          </Box>
          <NewAnswer open={open} setOpen={setOpen} questionId={question.id} />
        </AccordionDetails>
      </Accordion>
    </>
  )
}
