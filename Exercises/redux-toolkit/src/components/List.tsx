import AddCircleIcon from '@mui/icons-material/AddCircle'
import SortByAlphaRoundedIcon from '@mui/icons-material/SortByAlphaRounded'
import { Container, List, MenuItem, MenuList, TextField } from '@mui/material'
import { FC, useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import {
  ListItemProp,
  addItem,
  deleteList,
  sortList,
} from '../reducers/List/listSlice'
import { selectSingleList } from '../reducers/List/selectors'
import { SingleListItem } from './ListItem'

interface ListProps {
  listIndex: number
  handleDrop: (listNumber: number, deleteItems: boolean) => void
}

export const SingleList: FC<ListProps> = ({ listIndex, handleDrop }) => {
  const [sortDirectionAsc, setSortDirectionAsc] = useState(true)
  const [filter, setFilter] = useState('')
  const [filterList, setFilterList] = useState<ListItemProp[] | null>(null)
  const [openAutocomplete, setOpenAutocomplete] = useState(false)
  const [newItem, setNewItem] = useState('')

  //const state = useAppSelector(selectState)
  const dispatch = useAppDispatch()
  const list = useAppSelector((state) => selectSingleList(state, listIndex))

  useEffect(() => {
    console.log('List length:', list.length)
    if (list.length === 0) {
      console.log('Dispatching deleteList')
      dispatch(deleteList({ listIndex }))
    }
  }, [list, dispatch, listIndex])

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
          margin: '0.5rem',
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
            sx={{ width: '4rem', m: 0, g: 0 }}
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
          list.map((item, index) =>
            !filter ||
            item.name.toUpperCase().startsWith(filter.toUpperCase()) ? (
              <SingleListItem
                key={`${listIndex}-${index}-${item.name}`}
                index={index}
                listIndex={listIndex}
              />
            ) : null
          )
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
