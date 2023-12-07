import {
  Button,
  Container,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material'
import { useQuery, useMutation } from '@apollo/client'
import DeleteIcon from '@mui/icons-material/Delete'

import './App.css'
import { useState } from 'react'
import {
  DeleteLinkDocument,
  DeleteLinkMutationVariables,
  Link,
  LinksDocument,
  PostDocument,
} from './gql/graphql'

export const App = () => {
  const { loading, error, data } = useQuery(LinksDocument)
  const [deleteLink] = useMutation(DeleteLinkDocument)
  const [post] = useMutation(PostDocument)
  const [url, setUrl] = useState('')
  const [desc, setDesc] = useState('')
  console.log('Data:', data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>
  const links: Link[] = data?.links || []

  const handleAddLink = async () => {
    try {
      await post({
        variables: {
          description: desc,
          url: url,
        },
        refetchQueries: [{ query: LinksDocument }],
      })
    } catch (err) {
      console.error('Error:', err)
    }
    setDesc('')
    setUrl('')
  }

  const handleDeleteLink = async (
    id: DeleteLinkMutationVariables['deleteLinkId']
  ) => {
    try {
      await deleteLink({
        variables: { deleteLinkId: id },
        refetchQueries: [{ query: LinksDocument }],
      })
    } catch (err) {
      console.error('Error:', err)
    }
  }

  return (
    <Container>
      <Typography variant={'h3'} sx={{ mb: '3rem' }}>
        Apollo server/client, GraphQL, Nexus, Prisma, graphql-codegen
      </Typography>
      {links &&
        links.map((link) => (
          <Container
            key={link.id}
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <MuiLink target='_blank' href={link.url}>
              <Typography variant='h3' sx={{ cursor: 'pointer' }}>
                {link.description}
              </Typography>
            </MuiLink>
            <DeleteIcon
              sx={{ fontSize: '3rem', cursor: 'pointer' }}
              onClick={() => {
                handleDeleteLink(link.id)
              }}
            />
          </Container>
        ))}
      <Container sx={{ display: 'flex', flexDirection: 'column', mt: '2rem' }}>
        <TextField
          value={desc}
          placeholder='Description'
          variant='filled'
          sx={{ backgroundColor: 'whitesmoke' }}
          inputProps={{
            style: { fontSize: '2rem' },
          }}
          onChange={(e) => setDesc(e.target.value)}
        />
        <TextField
          value={url}
          placeholder='URL'
          variant='filled'
          sx={{ backgroundColor: 'whitesmoke' }}
          inputProps={{
            style: { fontSize: '2rem' },
          }}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button
          variant='contained'
          sx={{ fontSize: '2rem' }}
          onClick={handleAddLink}
        >
          Add new link
        </Button>
      </Container>
    </Container>
  )
}
