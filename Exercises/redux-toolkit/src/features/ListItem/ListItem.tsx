import {
  ListItemProp,
  selectDraggingInfo,
  selectItem,
  setDraggedItem,
  startDragging,
  stopDragging,
} from '../List/listSlice'
import { ListItem, Typography } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { FC } from 'react'

interface ListItemProps {
  item: ListItemProp
  index: number
  listIndex: number
  list: ListItemProp[]
}

export const SingleListItem: FC<ListItemProps> = ({
  item,
  index,
  listIndex,
  list,
}) => {
  const dispatch = useAppDispatch()
  const dragging = useAppSelector(selectDraggingInfo)
  const handleDragStart = () => {
    //const selectedItems = list.filter((item) => item.selected)

    dispatch(setDraggedItem({ listIndex: listIndex, itemIndex: index }))
    dispatch(startDragging())

    /*  dispatch({
      type: types.SET_DRAGGED_ITEM,
      payload: {
        items: selectedItems.length > 0 ? [...selectedItems] : [item],
        index: index,
        draggedFrom: listIndex,
      },
    })
    dispatch({ type: types.START_DRAGGING })
    */
  }

  const handleDragEnd = () => {
    dispatch(stopDragging())
    //dispatch({ type: types.STOP_DRAGGING })
  }

  const selectHandler = () => {
    dispatch(selectItem({ listIndex: listIndex, itemIndex: index }))
    /* dispatch({
      type: types.SELECT_ITEM,
      payload: {
        listIndex: listIndex,
        index: index,
        selected: !item.selected,
      },
    }) */
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
