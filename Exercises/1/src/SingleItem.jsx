import { Container, ListItem, Typography } from "@mui/material"
import * as types from "./reducer/actions.jsx"


export const SingleItem = ({
  item,
  index,
  listNumber,
  list,
  dispatch,
  state,
}) => {
  const handleDragStart = () => {
    const selectedItems = list.filter((item) => item.selected)
    dispatch({
      type: types.SET_DRAGGED_ITEM,
      payload: {
        items: selectedItems.length > 0 ? [...selectedItems] : [item],
        index: index,
        draggedFrom: listNumber,
      },
    })
    dispatch({ type: types.START_DRAGGING })
  }

  const selectHandler = () => {
    dispatch({
      type: types.SELECT_ITEM,
      payload: {
        listNumber: listNumber,
        index: index,
        selected: !item.selected,
      },
    })
  }

  return (
    <ListItem
      draggable={true}
      onDragStart={(e) => {
        handleDragStart()
      }}
      onClick={(e) => {
        e.preventDefault()
        selectHandler()
      }}
      sx={[
        {
          "&:hover": {
            border: "1px",
            color: "gray",
            backgroundColor: item.selected ? "green" : "lightblue",
          },
          cursor: state.dragging ? "grabbing !important" : "grab",
          p: 0,
        },
        item.selected && {
          backgroundColor: "green",
        },
      ]}
    >
      <Typography sx={{mt:"0.2rem"}}>{item.name}</Typography>
    </ListItem>
  )
}
