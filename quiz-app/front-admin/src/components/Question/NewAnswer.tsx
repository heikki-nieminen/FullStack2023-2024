import {
  Button,
  Checkbox,
  Modal,
  Typography,
  Box,
  OutlinedInput,
} from '@mui/material'
import { FC, Dispatch, SetStateAction, useState } from 'react'
import { useAppDispatch } from '../../state/hooks'
import { addNewAnswer } from '../../state/reducers/answerSlice'
import axios from 'axios'

const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 16,
  p: 2,
  borderRadius: '10px',
}

interface NewAnswerProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  questionId: string | number
}

export const NewAnswer: FC<NewAnswerProps> = ({
  open,
  setOpen,
  questionId,
}) => {
  const [name, setName] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)

  const dispatch = useAppDispatch()

  const handleClose = () => {
    setName('')
    setOpen(false)
  }
  const handleAddNewQuestion = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:3001/admin/add-answer',
        data: { name: name, questionId: questionId, isCorrect: isCorrect },
      })
      dispatch(
        addNewAnswer({
          name: name,
          questionId: questionId,
          id: response.data.id,
          isCorrect: isCorrect,
        })
      )
    } catch (err) {
      console.log(err)
    }
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant='h4' color={'black'}>
          New answer
        </Typography>
        <OutlinedInput
          id={'answer-name'}
          name={'answer-name'}
          autoFocus={true}
          required={true}
          fullWidth={true}
          sx={{ mb: '1rem' }}
          placeholder={'Answer'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Checkbox
            checked={isCorrect}
            onChange={() => setIsCorrect(!isCorrect)}
          />
          <Typography color={'black'}>Correct?</Typography>
        </Box>
        <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
          <Button variant='contained' onClick={handleAddNewQuestion}>
            Add{' '}
          </Button>
          <Button variant='contained' onClick={handleClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
