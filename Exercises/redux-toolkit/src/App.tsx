import './App.css'
import { Paper, Button, Grid, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { SingleList } from './components/List'
import {
  clearDraggedItem,
  moveItems,
  stopDragging,
  saveDataToLocalStorage,
  clearSelected,
  initializeDataFromLocalStorage,
  addList,
} from './reducers/List/listSlice'
import { selectLists, selectSelectedId } from './reducers/List/selectors'
import {} from 'react-redux'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { ButtonBox } from './components/ButtonBox'

const App = () => {
  const [dataInitialized, setDataInitialized] = useState(false)
  const dispatch = useAppDispatch()
  const lists = useAppSelector(selectLists)
  const selectedId = useAppSelector(selectSelectedId)

  useEffect(() => {
    console.log('Getting data from localStorage')
    dispatch(initializeDataFromLocalStorage())
    setDataInitialized(true)
  }, [dispatch])

  useEffect(() => {
    if (dataInitialized) {
      console.log('Saving data to localStorage')
      dispatch(saveDataToLocalStorage())
    }
  }, [lists, dispatch, dataInitialized])

  const handleDrop = (listNumber: number | null, deleteItems: boolean) => {
    if (!deleteItems && listNumber !== null && listNumber !== selectedId) {
      console.log('Moving items')
      dispatch(
        moveItems({
          sourceList: selectedId,
          targetList: listNumber,
        })
      )
    }

    dispatch(stopDragging())
    dispatch(clearDraggedItem())
    dispatch(clearSelected())
  }

  const addListHandler = () => {
    dispatch(addList())
  }
  console.log('Render')
  return (
    <Paper>
      <Grid container spacing={1} sx={{ alignItems: 'flex-start' }}>
        {dataInitialized && (
          <>
            {lists.map((_, index) => (
              <Grid item xs={5} key={index}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <SingleList listIndex={index} handleDrop={handleDrop} />
                  {lists[index + 1] && (
                    <ButtonBox leftIndex={index} rightIndex={index + 1} />
                  )}
                </Box>
              </Grid>
            ))}
            <Button variant='contained' onClick={addListHandler}>
              Add new list
            </Button>
          </>
        )}
      </Grid>
    </Paper>
  )
}

export default App
