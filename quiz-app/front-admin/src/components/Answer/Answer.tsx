import { FC, useState, useRef } from 'react'
import {
  AnswerType,
  deleteAnswer,
  editAnswer,
} from '../../state/reducers/answerSlice'
import { Box, Checkbox, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch } from '../../state/hooks'
import axios from 'axios'

interface AnswerProps {
  answer: AnswerType
}

export const Answer: FC<AnswerProps> = ({ answer }) => {
  const dispatch = useAppDispatch()
  const [answerText, setAnswerText] = useState(answer.name)
  const isCorrectRef = useRef(answer.isCorrect)
  const handleDeleteAnswer = async () => {
    //console.log('Deleting answer')
    try {
      const response = await axios({
        method: 'DELETE',
        url: `${
          import.meta.env.VITE_BACKEND_API_ADDRESS
        }/api/admin/delete-answer/${answer.id}`,
      })
      console.log('Response:', response)
      dispatch(deleteAnswer(answer.id))
    } catch (err) {
      console.log('ERROR:', err)
    }
  }

  const handleEditAnswer = async () => {
    console.log('Testings')
    try {
      await axios({
        method: 'PUT',
        url: `${
          import.meta.env.VITE_BACKEND_API_ADDRESS
        }/api/admin/update-answer/${answer.id}`,
        data: {
          ...answer,
          name: answerText,
          isCorrect: isCorrectRef.current,
        },
      })
      dispatch(
        editAnswer({
          ...answer,
          name: answerText,
          isCorrect: isCorrectRef.current,
        })
      )
    } catch (err) {
      console.log('Error:', err)
    }
  }
  return (
    <Box
      bgcolor={answer.isCorrect ? 'green' : 'white'}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <TextField
          value={answerText}
          variant='standard'
          onChange={(e) => setAnswerText(e.target.value)}
          onBlur={handleEditAnswer}
        />
        <Checkbox
          checked={isCorrectRef.current}
          onChange={() => {
            isCorrectRef.current = !isCorrectRef.current
            handleEditAnswer()
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>

      <DeleteIcon sx={{ cursor: 'pointer' }} onClick={handleDeleteAnswer} />
    </Box>
  )
}
