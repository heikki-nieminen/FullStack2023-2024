import "./App.css"
import {
  Container,
  Paper,
} from "@mui/material"
import { useReducer, useState } from "react"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"

import { reducer, initialState } from "./reducer/reducer"
import { SingleList } from "./SingleList.jsx"
import * as types from "./reducer/actions.jsx"

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const buttonHandler = (direction) => {
    if(direction === "lefttoright") {
      dispatch({type: types.MOVE_ITEMS, payload: {sourceList: 1}})
    }
    else {
      dispatch({type: types.MOVE_ITEMS, payload: {sourceList: 2}})
    }
  }
  const handleDrop = (listNumber) => {
    if (listNumber != state.draggedItems.draggedFrom)
    {
      dispatch({type: types.MOVE_ITEMS})
      //dispatch({type: types.DROP_DRAGGED_ITEM})
    }
  }

  return (
    <Paper sx={{ display: "flex", flexDirection: "row" }}>
      <SingleList
        list={state.lists.listOne}
        dispatch={dispatch}
        listNumber={1}
        handleDrop={handleDrop}
      />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <ArrowLeftIcon
          sx={{ fontSize: "6rem", cursor: "pointer" }}
          onClick={() => {
            buttonHandler()
          }}
        />
        <ArrowRightIcon
          sx={{ fontSize: "6rem", cursor: "pointer" }}
          onClick={() => {
            buttonHandler("lefttoright")
          }}
        />
      </Container>
      <SingleList
        list={state.lists.listTwo}
        dispatch={dispatch}
        listNumber={2}
        handleDrop={handleDrop}
      />
    </Paper>
  )
}

export default App
