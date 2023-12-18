import { Button, Modal, Typography, Box, OutlinedInput } from '@mui/material'
import { FC, Dispatch, SetStateAction, useState } from 'react'
import { useAppDispatch } from '../../state/hooks'
import { addNewQuestion } from '../../state/reducers/questionSlice'
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

interface NewQuestionProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  quizId: string | number
}

export const NewQuestion: FC<NewQuestionProps> = ({
  open,
  setOpen,
  quizId,
}) => {
  const [name, setName] = useState('')

  const dispatch = useAppDispatch()

  const handleClose = () => {
    setName('')
    setOpen(false)
  }
  const handleAddNewQuestion = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:3001/admin/add-question',
        data: { name: name, quizId: quizId },
      })
      dispatch(
        addNewQuestion({ name: name, quizId: quizId, id: response.data.id })
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
          New question
        </Typography>
        <OutlinedInput
          id={'question-name'}
          name={'question-name'}
          autoFocus={true}
          required={true}
          fullWidth={true}
          sx={{ mb: '1rem' }}
          placeholder={'Question'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
