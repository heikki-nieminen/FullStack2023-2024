import { useAppDispatch } from '../../app/hooks'
import { Container, List, TextField, MenuList, MenuItem } from '@mui/material'
import { useState, FC } from 'react'
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { sortList, ListItemProp, addItem } from './listSlice'
import { SingleListItem } from '../ListItem/ListItem'

interface ListProps {
  listIndex: number
  list: ListItemProp[]
  handleDrop: (listNumber: number, deleteItems: boolean) => void
}

export const SingleList: FC<ListProps> = ({ listIndex, list, handleDrop }) => {
  const [sortDirectionAsc, setSortDirectionAsc] = useState(true)
  const [filter, setFilter] = useState('')
  const [filterList, setFilterList] = useState<ListItemProp[] | null>(null)
  const [openAutocomplete, setOpenAutocomplete] = useState(false)
  const [newItem, setNewItem] = useState('')

  //const state = useAppSelector(selectState)
  const dispatch = useAppDispatch()

  const sortListHandler = () => {
    dispatch(
      sortList({ listIndex: listIndex, sortDirectionAsc: sortDirectionAsc })
    )
    setSortDirectionAsc(!sortDirectionAsc)
  }

  const handleFilterChange = (e: any) => {
    if (!e.target.value || e.target.value === '') {
      setFilter('')
      setOpenAutocomplete(false)
    } else {
      setFilter(e.target.value)
      const autoCompleteList = list.filter((item) =>
        item.name.toUpperCase().startsWith(e.target.value.toUpperCase())
      )

      if (autoCompleteList.length === 1) {
        if (filter.length > e.target.value.length) {
          setFilter('')
          setOpenAutocomplete(false)
        } else {
          setFilter(autoCompleteList[0].name)
          setOpenAutocomplete(false)
        }
      } else {
        setFilterList(autoCompleteList)
        setOpenAutocomplete(true)
      }
    }
  }

  const onKeyDownHandler = (e: any) => {
    if (e.key === 'Enter') {
      handleAddNewItem()
    }
  }

  const handleAddNewItem = () => {
    if (newItem.length > 0) {
      dispatch(addItem({ targetList: listIndex, item: { name: newItem } }))
      setNewItem('')
    }
  }
  return (
    <Container>
      <List
        sx={{
          width: 1,
          height: '20rem',
          maxHeight: '20rem',
          overflowY: 'scroll',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
        onDrop={() => handleDrop(listIndex, false)}
        onDragOver={(e) => e.preventDefault()}
      >
        <Container sx={{ display: 'flex', flexDirection: 'row', g: 0, m: 0 }}>
          <TextField
            variant='standard'
            placeholder='Search'
            value={filter}
            sx={{ width: '5rem', m: 0, g: 0 }}
            onChange={handleFilterChange}
          />

          <SortByAlphaRoundedIcon
            sx={{ cursor: 'pointer', ml: 1 }}
            onClick={() => sortListHandler()}
          />
        </Container>
        {openAutocomplete && (
          <MenuList sx={{ backgroundColor: 'lightblue' }}>
            {filterList && (
              <>
                {filterList.map((item, index) => {
                  return (
                    <MenuItem
                      key={index}
                      onClick={() => {
                        setFilter(item.name)
                        setOpenAutocomplete(false)
                      }}
                    >
                      {item.name}
                    </MenuItem>
                  )
                })}
              </>
            )}
          </MenuList>
        )}
        {list.length > 0 ? (
          list.map((item, index) => {
            if (
              !filter ||
              item.name.toUpperCase().startsWith(filter.toUpperCase())
            ) {
              return (
                <SingleListItem
                  item={item}
                  key={`${listIndex}-${index}-${item.name}`}
                  index={index}
                  listIndex={listIndex}
                  list={list}
                />
              )
            }
          })
        ) : (
          <>This list has no items.</>
        )}
      </List>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'left',
          mb: '1rem',
          p: 0,
          g: 0,
        }}
      >
        <TextField
          variant='standard'
          placeholder='New name'
          name='new-name'
          value={newItem}
          sx={{ m: 0, p: 0, g: 0 }}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={onKeyDownHandler}
        ></TextField>
        {newItem && (
          <AddCircleIcon
            onClick={handleAddNewItem}
            sx={{ cursor: 'pointer' }}
          />
        )}
      </Container>
    </Container>
  )
}

/* import styles from "./Counter.module.css"

export function Counter() {
  const count = useAppSelector(selectCount)
  const dispatch = useAppDispatch()
  const [incrementAmount, setIncrementAmount] = useState("2")

  const incrementValue = Number(incrementAmount) || 0

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(incrementValue))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(incrementValue))}
        >
          Add Async
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementIfOdd(incrementValue))}
        >
          Add If Odd
        </button>
      </div>
    </div>
  )
} */
