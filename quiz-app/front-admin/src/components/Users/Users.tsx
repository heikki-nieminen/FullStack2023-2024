import { Box, Container } from '@mui/material'
import axios from 'axios'
import { FC, useEffect, useState } from 'react'

export const Users = () => {
  const [users, setUsers] = useState<UserType[] | null>(null)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: `${
            import.meta.env.VITE_BACKEND_API_ADDRESS
          }/api/admin/get-users`,
        })
        setUsers(response.data.data)
      } catch (err) {
        console.log('Error:', err)
      }
    }
    fetchUsers()
  }, [])

  console.log('Users:', users)
  return (
    <Container sx={{ mt: '2rem' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Container>ID</Container>
        <Container>Username</Container>
      </Box>
      {users?.map((user: UserType) => (
        <User key={user.id} user={user} />
      ))}
    </Container>
  )
}

interface UserType {
  id: number
  username: string
}

interface UserProps {
  user: UserType
}

export const User: FC<UserProps> = ({ user }) => {
  console.log('Userdata:', user)
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Container>{user.id}</Container>
      <Container>{user.username}</Container>
    </Box>
  )
}
