import {
  selectItem,
  setDraggedItem,
  startDragging,
  stopDragging,
} from '../reducers/List/listSlice'
import {
  selectSingleItem,
  selectDraggingInfo,
} from '../reducers/List/selectors'
import { ListItem, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { FC } from 'react'

interface ListItemProps {
  index: number
  listIndex: number
}

export const SingleListItem: FC<ListItemProps> = ({ index, listIndex }) => {
  const dispatch = useAppDispatch()
  const item = useAppSelector(selectSingleItem(index, listIndex))
  const dragging = useAppSelector(selectDraggingInfo)
  const handleDragStart = () => {
    dispatch(setDraggedItem({ listIndex: listIndex, itemIndex: index }))
    dispatch(startDragging())
  }

  const handleDragEnd = () => {
    dispatch(stopDragging())
  }

  const selectHandler = () => {
    dispatch(selectItem({ listIndex: listIndex, itemIndex: index }))
  }

  return (
    <ListItem
      draggable={true}
      onDragStart={(e) => {
        handleDragStart()
      }}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.preventDefault()
        selectHandler()
      }}
      sx={[
        {
          '&:hover': {
            border: '1px',
            color: 'gray',
            backgroundColor: item.selected ? 'green' : 'lightblue',
          },
          cursor: dragging ? 'grabbing !important' : 'grab',
          p: 0,
        },
        item.selected && {
          backgroundColor: 'green',
        },
      ]}
    >
      <Typography sx={{ mt: '0.2rem' }}>{item.name}</Typography>
    </ListItem>
  )
}
