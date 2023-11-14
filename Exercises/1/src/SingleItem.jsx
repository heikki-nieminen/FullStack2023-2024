import { ListItem } from "@mui/material"
import * as types from "./reducer/actions.jsx"
import { useState } from "react"

export const SingleItem = ({ item, index, listNumber, list, dispatch }) => {
  const [dragging, setDragging] = useState(false)

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
    setDragging(true)
  }

  const handleDragEnd = () => {
    setDragging(false)
    dispatch({ type: types.CLEAR_DRAGGED_ITEM })
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

  console.log()
  return (
    <ListItem
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      sx={[
        {
          "&:hover": {
            border: "1px",
            color: "gray",
            backgroundColor: "lightblue",
          },
          cursor: dragging ? "grabbing" : "grab",
          width: 1,
        },
        item.selected && {
          backgroundColor: "green",
        },
      ]}
      onClick={(e) => {
        e.preventDefault()
        selectHandler()
      }}
    >
      {item.name}
    </ListItem>
  )
}
