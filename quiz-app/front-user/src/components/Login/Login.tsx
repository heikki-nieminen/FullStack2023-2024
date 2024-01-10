import {
  Button,
  Container,
  OutlinedInput,
  Paper,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

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
        <Button variant='contained' fullWidth>
          Login
        </Button>
        <Typography component={Link} to={'login'}>
          Don't have an account?
        </Typography>
      </Container>
    </Paper>
  )
}
