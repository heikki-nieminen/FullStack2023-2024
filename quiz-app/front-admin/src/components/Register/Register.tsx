import { FC, Dispatch, SetStateAction, useState } from 'react'
import { Modal, Paper, OutlinedInput, Button, Tooltip } from '@mui/material'
import axios from 'axios'
import { useAppDispatch } from '../../state/hooks'
import { loginUser } from '../../state/reducers/userSlice'

interface RegisterProps {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const Register: FC<RegisterProps> = ({ open, setOpen }) => {
  const [username, setUsername] = useState<string | null>(null)
  const [password, setPassword] = useState<string | null>(null)
  const [passwordAgain, setPasswordAgain] = useState<string | null>(null)
  const [invalidPassword, setInvalidPassword] = useState<boolean | null>(null)
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

  const notOkStyle = {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'red',
    },
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRegisterClick = async () => {
    if (checkPassword()) {
      try {
        const response = await axios({
          method: 'POST',
          url: `${import.meta.env.VITE_BACKEND_API_ADDRESS}/api/admin/register`,
          data: {
            username: username,
            password: password,
          },
        })
        console.log('Response:', response)
        dispatch(loginUser(response.data))
      } catch (err) {
        console.log('Error:', err)
      }
      handleClose()
    } else {
      setInvalidPassword(true)
      return
    }
  }

  const checkPassword = () => {
    if (password === passwordAgain) return true
    return false
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
            name={'new-password'}
            type={'password'}
            fullWidth={true}
            required={true}
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <Tooltip title={invalidPassword ? 'Salasanat eivät täsmää' : ''}>
            <OutlinedInput
              name={'new-password-again'}
              type={'password'}
              fullWidth={true}
              required={true}
              value={passwordAgain}
              placeholder='Password again'
              sx={invalidPassword ? notOkStyle : undefined}
              onChange={(e) => setPasswordAgain(e.target.value)}
            />
          </Tooltip>

          <Button
            fullWidth={true}
            variant={'contained'}
            onClick={handleRegisterClick}
            sx={{ mt: '1rem' }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Modal>
  )
}
