import { QuestionType } from '../../state/reducers/questionSlice'
import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import { FC } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useAppSelector } from '../../state/hooks'
import { selectAnswersByQuestionId } from '../../state/reducers/answerSlice'
import { Answer } from '../Answer/Answer'

interface QuestionProps {
  question: QuestionType
}

export const Question: FC<QuestionProps> = ({ question }) => {
  const answers = useAppSelector(selectAnswersByQuestionId(question.id))

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography variant='h5'>{question.name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {answers.map((answer) => (
            <Answer answer={answer} />
          ))}
        </AccordionDetails>
      </Accordion>
    </>
  )
}
