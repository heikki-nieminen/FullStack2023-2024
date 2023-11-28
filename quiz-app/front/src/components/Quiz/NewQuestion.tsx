import { Button, Modal, Typography, Box, OutlinedInput } from '@mui/material'
import { FC, Dispatch, SetStateAction, useState } from 'react'
import { useAppDispatch } from '../../state/hooks'
import { addNewQuestion } from '../../state/reducers/questionSlice'

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

  const handleClose = () => setOpen(false)
  const handleAddNewQuestion = () => {
    try {
      dispatch(addNewQuestion({ name: name, quizId: quizId }))
    } catch (err) {
      console.log(err)
    }
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant='h4'>New quiz</Typography>
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
