import './App.css'
import { Container, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import DeleteIcon from '@mui/icons-material/Delete'
import { SingleList } from './features/List/List'
import {
  ListState,
  clearDraggedItem,
  deleteItem,
  moveItems,
  selectState,
  stopDragging,
  saveData,
  clearSelected,
} from './features/List/listSlice'
import {} from 'react-redux'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { initializeData } from './features/List/listSlice'

const App = () => {
  const [dataInitialized, setDataInitialized] = useState(false)
  const state = useAppSelector(selectState)
  const dispatch = useAppDispatch()

  // useEffect hook for pulling initial data from localStorage
  /*  useEffect(() => {
    const storedData: string | null = localStorage.getItem('listData')
    if (storedData) {
      const parsedData: ListState = JSON.parse(storedData)
      const destructuredData = { ...parsedData }
      console.log('D:', destructuredData)
      dispatch(initializeData(parsedData))
    }
    setDataInitialized(true)
  }, []) 
  
  // useEffect hook for saving data to localStorage if state has changed
  useEffect(() => {
    if (dataInitialized) {
      localStorage.setItem('listData', JSON.stringify(state.content))
    }
  }, [state, dataInitialized])
  */

  useEffect(() => {
    console.log('Getting data from localStorage')
    dispatch(initializeData())
    setDataInitialized(true)
  }, [])

  useEffect(() => {
    if (dataInitialized) {
      console.log('Saving data to localStorage')
      dispatch(saveData())
    }
  }, [state.content])

  const buttonHandler = (direction: string | null = null) => {
    if (direction === 'lefttoright') {
      dispatch(moveItems({ sourceList: 0, targetList: 1 }))
    } else if (direction === 'delete') {
      dispatch(deleteItem({ sourceList: state.content.selectedFrom }))
    } else {
      dispatch(moveItems({ sourceList: 1, targetList: 0 }))
    }
  }
  const handleDrop = (listNumber: number | null, deleteItems: boolean) => {
    if (
      !deleteItems &&
      listNumber !== null &&
      listNumber !== state.content.selectedFrom &&
      listNumber !== state.content.draggedItems.draggedFrom
    ) {
      console.log('Moving items')
      dispatch(
        moveItems({
          sourceList: state.content.selectedFrom,
          targetList: listNumber,
        })
      )
    } else if (deleteItems) {
      console.log('MIKSI')
      dispatch(deleteItem({ sourceList: state.content.selectedFrom }))
    }

    dispatch(stopDragging())
    dispatch(clearDraggedItem())
    dispatch(clearSelected())
  }

  return (
    <Paper sx={{ display: 'flex', flexDirection: 'row' }}>
      {dataInitialized && (
        <>
          <SingleList
            listIndex={0}
            list={state.content.lists[0]}
            handleDrop={handleDrop}
          />

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
                state.content.selectedFrom === 1
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
                if (state.content.selectedFrom === 1) {
                  buttonHandler()
                }
              }}
            />
            <ArrowRightIcon
              sx={[
                {
                  fontSize: '8rem',
                  cursor: 'pointer',
                },
                state.content.selectedFrom === 0
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
                if (state.content.selectedFrom === 0) {
                  buttonHandler('lefttoright')
                }
              }}
            />
            <DeleteIcon
              sx={{
                fontSize: '5rem',
                cursor:
                  state.content.selectedFrom !== null
                    ? 'pointer'
                    : 'not-allowed',
                color: state.content.selectedFrom !== null ? 'black' : 'gray',
                opacity: state.content.selectedFrom !== null ? 1 : 0.5,
              }}
              onClick={() => {
                if (state.content.selectedFrom !== null) {
                  buttonHandler('delete')
                }
              }}
              onDragOver={(e: any) => {
                e.preventDefault()
              }}
              onDrop={(e: any) => {
                e.preventDefault()
                handleDrop(state.content.draggedItems.draggedFrom, true)
              }}
            />
          </Container>

          <SingleList
            listIndex={1}
            list={state.content.lists[1]}
            handleDrop={handleDrop}
          />
        </>
      )}
    </Paper>
  )
}

export default App

/* function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className='App-link'
            href='https://reactjs.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            React
          </a>
          <span>, </span>
          <a
            className='App-link'
            href='https://redux.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Redux
          </a>
          <span>, </span>
          <a
            className='App-link'
            href='https://redux-toolkit.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className='App-link'
            href='https://react-redux.js.org/'
            target='_blank'
            rel='noopener noreferrer'
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  )
}

export default App
 */
