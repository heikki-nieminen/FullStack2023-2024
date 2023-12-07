import { Modal, OutlinedInput, Button, Paper } from '@mui/material'
import { FC, Dispatch, SetStateAction, useState } from 'react'
import axios from 'axios'
import { useAppDispatch } from '../../state/hooks'
import { loginUser } from '../../state/reducers/userSlice'

interface LoginProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const Login: FC<LoginProps> = ({ open, setOpen }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useAppDispatch()

  const style = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '10px',
  }

  const handleClose = () => {
    setOpen(false)
  }

  // Check token and set loggedIn status at store
  const handleLoginClick = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'http://localhost:3001/login',
        data: {
          username: username,
          password: password,
        },
      })
      console.log('Response:', response)
      axios.defaults.headers.common[
        'Authorization'
      ] = `Token ${response.data.token}`
      dispatch(loginUser({ token: response.data.token, username: username }))
    } catch (err) {
      console.log('Error:', err)
    }
    handleClose()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper sx={style}>
        <form id={'login-form'}>
          <OutlinedInput
            type={'username'}
            value={username}
            autoFocus={true}
            required={true}
            fullWidth={true}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <OutlinedInput
            type={'password'}
            fullWidth={true}
            required={true}
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            fullWidth={true}
            variant={'contained'}
            onClick={handleLoginClick}
            sx={{ mt: '1rem' }}
          >
            Login
          </Button>
        </form>
      </Paper>
    </Modal>
  )
}
