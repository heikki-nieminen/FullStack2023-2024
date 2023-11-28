import { FC } from 'react'
import { AnswerType } from '../../state/reducers/answerSlice'
import { Typography } from '@mui/material'

interface AnswerProps {
  answer: AnswerType
}

export const Answer: FC<AnswerProps> = ({ answer }) => {
  return <Typography>{answer.name}</Typography>
}
