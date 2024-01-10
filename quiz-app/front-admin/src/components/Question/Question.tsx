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
import { FC, useState, SyntheticEvent } from 'react'
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
  index: number
  expanded: string | false
  handleAccordionChange: (
    panel: string
  ) => (e: SyntheticEvent, isExpanded: boolean) => void
}

export const Question: FC<QuestionProps> = ({
  question,
  index,
  expanded,
  handleAccordionChange,
}) => {
  const answers = useAppSelector(selectAnswersByQuestionId(question.id))
  const [open, setOpen] = useState(false)
  //const [accordionOpen, setAccordionOpen] = useState(false)
  const [questionName, setQuestionName] = useState(question.name)
  const dispatch = useAppDispatch()

  console.log('Question:', question)

  const handleQuestionDelete = async () => {
    try {
      await axios({
        method: 'DELETE',
        url: `${
          import.meta.env.VITE_BACKEND_API_ADDRESS
        }/api/admin/delete-question/${question.id}`,
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
        url: `${
          import.meta.env.VITE_BACKEND_API_ADDRESS
        }/api/admin/update-question/${question.id}`,
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
      <Accordion
        expanded={expanded === `panel${index}`}
        onChange={handleAccordionChange(`panel${index}`)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`panel${index}bh-content`}
          id={`panel${index}bh-header`}
          //onClick={() => handleAccordionChange(`panel${index}`)}
        >
          {expanded === `panel${index}` ? (
            <TextField
              value={questionName}
              variant='standard'
              inputProps={{ style: { fontSize: 24 } }}
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
