import {
  Button,
  Container,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegisterUserMutation } from '../../state/reducers/api'

export const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)

  const handleRepeatedPassword = () => {
    setPasswordsMatch(password === repeatPassword)
  }

  const handleSubmitRegister = async () => {
    try {
      const register = useRegisterUserMutation
      await register({ username: username, password: password })
    } catch (err) {}
  }

  return (
    <Paper sx={{ py: 2 }}>
      <Container>
        <Typography variant={'h3'}>Register</Typography>
        <OutlinedInput
          fullWidth
          required
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <OutlinedInput
          fullWidth
          type='password'
          required
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <OutlinedInput
          fullWidth
          type='password'
          required
          placeholder='Repeat password'
          sx={{ outlineColor: !passwordsMatch ? 'red' : 'initial' }}
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}
          onBlur={handleRepeatedPassword}
        />
        <Button variant='contained' fullWidth disabled={!passwordsMatch}>
          Register
        </Button>
        <Typography component={Link} to={'login'}>
          Already have an account?
        </Typography>
      </Container>
    </Paper>
  )
}
