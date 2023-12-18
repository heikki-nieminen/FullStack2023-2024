import { Button, Modal, Typography, Box, OutlinedInput } from '@mui/material'
import { FC, Dispatch, SetStateAction, useState } from 'react'
import { useAppDispatch } from '../../state/hooks'
import { addNewQuiz } from '../../state/reducers/quizSlice'
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

interface NewQuizProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const NewQuiz: FC<NewQuizProps> = ({ open, setOpen }) => {
  const [name, setName] = useState('')

  const dispatch = useAppDispatch()

  const handleClose = () => {
    setName('')
    setOpen(false)
  }
  const handleAddNewQuiz = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:3001/admin/add-quiz',
        data: { name: name },
      })
      dispatch(addNewQuiz({ name: name, id: response.data.id }))
    } catch (err) {
      console.log(err)
    }
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant='h4' color={'black'}>
          New quiz
        </Typography>
        <OutlinedInput
          id={'quiz-name'}
          name={'quiz-name'}
          autoFocus={true}
          required={true}
          fullWidth={true}
          sx={{ mb: '1rem' }}
          placeholder={'Quiz name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
          <Button variant='contained' onClick={handleAddNewQuiz}>
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
