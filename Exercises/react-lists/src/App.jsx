import "./App.css"
import { Container, List, Paper } from "@mui/material"
import { useEffect, useReducer, useState } from "react"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import DeleteIcon from "@mui/icons-material/Delete"

import { reducer, initialState } from "./reducer/reducer"
import { SingleList } from "./SingleList.jsx"
import * as types from "./reducer/actions.jsx"

const App = () => {
  const [state, dispatch] = useReducer(reducer, {})
  const [dataInitialized, setDataInitialized] = useState(false)

  // useEffect hook for pulling initial data from localStorage
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("listData"))
    if (storedData) {
      dispatch({
        type: types.INITIALIZE_DATA,
        payload: {
          data: storedData,
        },
      })
    } else {
      dispatch({
        type: types.INITIALIZE_DATA,
        payload: {
          data: initialState,
        },
      })
    }
    setDataInitialized(true)
  }, [])

  // useEffect hook for saving data to localStorage if state has changed
  useEffect(() => {
    if (dataInitialized) {
      localStorage.setItem("listData", JSON.stringify(state))
    }
  }, [state])

  const buttonHandler = (direction) => {
    if (direction === "lefttoright") {
      dispatch({ type: types.MOVE_ITEMS, payload: { sourceList: 1 } })
    } else if (direction === "delete") {
      dispatch({
        type: types.DELETE_ITEMS,
        payload: { sourceList: state.selectedFrom },
      })
    } else {
      console.log("Right to left")
      dispatch({ type: types.MOVE_ITEMS, payload: { sourceList: 2 } })
    }
  }
  const handleDrop = (listNumber, deleteItems) => {
    if (!deleteItems && listNumber != state.draggedItems.draggedFrom) {
      dispatch({ type: types.MOVE_ITEMS })
    } else if (deleteItems) {
      dispatch({
        type: types.DELETE_ITEMS,
        payload: { sourceList: state.selectedFrom },
      })
    }
    dispatch({ type: types.STOP_DRAGGING })
    dispatch({ type: types.CLEAR_DRAGGED_ITEM })
  }

  return (
    <Paper sx={{ display: "flex", flexDirection: "row" }}>
      {dataInitialized && (
        <>
          <SingleList
            list={state.lists.listOne}
            dispatch={dispatch}
            listNumber={1}
            handleDrop={handleDrop}
            state={state}
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
              sx={[
                {
                  fontSize: "8rem",
                  cursor: "pointer",
                },
                state.selectedFrom === 2
                  ? {
                      color: "lime",
                    }
                  : {
                      color: "gray",
                      opacity: "0.5",
                      cursor: "not-allowed",
                    },
              ]}
              onClick={() => {
                if (state.selectedFrom === 2) {
                  buttonHandler()
                }
              }}
            />
            <ArrowRightIcon
              sx={[
                {
                  fontSize: "8rem",
                  cursor: "pointer",
                },
                state.selectedFrom === 1
                  ? {
                      color: "lime",
                    }
                  : {
                      color: "gray",
                      opacity: "0.5",
                      cursor: "not-allowed",
                    },
              ]}
              onClick={() => {
                if (state.selectedFrom === 1) {
                  buttonHandler("lefttoright")
                }
              }}
            />
            <DeleteIcon
              sx={{
                fontSize: "5rem",
                cursor: state.selectedFrom ? "pointer" : "not-allowed",
                color: state.selectedFrom ? "black" : "gray",
                opacity: state.selectedFrom ? 1 : 0.5
              }}
              onClick={() => {
                if (state.selectedFrom !== null) {
                  buttonHandler("delete")
                }
              }}
              onDragOver={(e) => {
                e.preventDefault()
              }}
              onDrop={(e) => {
                e.preventDefault()
                handleDrop(state.draggedItems.draggedFrom, true)
              }}
            />
          </Container>

          <SingleList
            list={state.lists.listTwo}
            dispatch={dispatch}
            listNumber={2}
            handleDrop={handleDrop}
            state={state}
          />
        </>
      )}
    </Paper>
  )
}

export default App
