import { FC } from 'react'
import { Container } from '@mui/material'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import DeleteIcon from '@mui/icons-material/Delete'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { moveItems, deleteItem } from '../reducers/List/listSlice'
import { selectSelectedId } from '../reducers/List/selectors'

interface ButtonBoxProps {
  leftIndex: number
  rightIndex: number
}

export const ButtonBox: FC<ButtonBoxProps> = ({ leftIndex, rightIndex }) => {
  const selectedId = useAppSelector(selectSelectedId)
  const dispatch = useAppDispatch()

  const buttonHandler = (sourceIndex: number, targetIndex: number) => {
    dispatch(moveItems({ sourceList: sourceIndex, targetList: targetIndex }))
  }
  const deleteButtonHandler = () => {
    dispatch(deleteItem({ sourceList: selectedId }))
  }
  const deleteDropHandler = () => {
    dispatch(deleteItem({ sourceList: selectedId }))
  }
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <ArrowLeftIcon
        sx={[
          {
            fontSize: '8rem',
            cursor: 'pointer',
          },
          selectedId === rightIndex
            ? {
                color: 'lime',
              }
            : {
                color: 'gray',
                opacity: '0.5',
                cursor: 'not-allowed',
              },
        ]}
        onClick={() => {
          if (selectedId === rightIndex) {
            buttonHandler(rightIndex, leftIndex)
          }
        }}
      />
      <ArrowRightIcon
        sx={[
          {
            fontSize: '8rem',
            cursor: 'pointer',
          },
          selectedId === leftIndex
            ? {
                color: 'lime',
              }
            : {
                color: 'gray',
                opacity: '0.5',
                cursor: 'not-allowed',
              },
        ]}
        onClick={() => {
          if (selectedId === leftIndex) {
            buttonHandler(leftIndex, rightIndex)
          }
        }}
      />
      <DeleteIcon
        sx={{
          fontSize: '5rem',
          cursor: selectedId !== null ? 'pointer' : 'not-allowed',
          color: selectedId !== null ? 'black' : 'gray',
          opacity: selectedId !== null ? 1 : 0.5,
        }}
        onClick={() => {
          if (selectedId !== null) {
            deleteButtonHandler()
          }
        }}
        onDragOver={(e: any) => {
          e.preventDefault()
        }}
        onDrop={(e: any) => {
          e.preventDefault()
          deleteDropHandler()
        }}
      />
    </Container>
  )
}
