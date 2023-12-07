import { gql } from '@apollo/client'

export const GET_LINKS = gql`
  query Links {
    links {
      id
      url
      description
    }
  }
`

export const DELETE_LINK = gql`
  mutation DeleteLink($deleteLinkId: Int!) {
    deleteLink(id: $deleteLinkId)
  }
`

export const ADD_LINK = gql`
  mutation Post($description: String!, $url: String!) {
    post(description: $description, url: $url)
  }
`
