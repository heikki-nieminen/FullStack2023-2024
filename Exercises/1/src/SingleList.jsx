import { SingleItem } from "./SingleItem.jsx"
import {
  Button,
  Container,
  List,
  TextField,
  MenuList,
  MenuItem,
  ListItem,
} from "@mui/material"
import * as types from "./reducer/actions.jsx"
import { useState } from "react"
import SortByAlphaRoundedIcon from "@mui/icons-material/SortByAlphaRounded"
import AddCircleIcon from "@mui/icons-material/AddCircle"

export const SingleList = ({
  list,
  listNumber,
  handleDrop,
  dispatch,
  state,
}) => {
  const [sortDirectionAsc, setSortDirectionAsc] = useState(true)
  const [filter, setFilter] = useState("")
  const [filterList, setFilterList] = useState(null)
  const [openAutocomplete, setOpenAutocomplete] = useState(false)
  const [newItem, setNewItem] = useState("")

  const sortList = () => {
    dispatch({
      type: types.SORT_LIST,
      payload: { sortDirectionAsc: sortDirectionAsc, listNumber: listNumber },
    })
    setSortDirectionAsc(!sortDirectionAsc)
  }

  const handleFilterChange = (e) => {
    if (!e.target.value || e.target.value == "") {
      setFilter("")
      setOpenAutocomplete(false)
    } else {
      setFilter(e.target.value)
      const autoCompleteList = list.filter((item) =>
        item.name.toUpperCase().startsWith(e.target.value.toUpperCase())
      )

      if (autoCompleteList.length == 1) {
        if (filter.length > e.target.value.length) {
          setFilter("")
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

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      handleAddNewItem()
    }
  }

  const handleAddNewItem = () => {
    dispatch({
      type: types.ADD_ITEM,
      payload: { item: { name: newItem }, listNumber: listNumber },
    })
    setNewItem("")
  }
  return (
    <Container>
      <List
        sx={{
          width: 1,
          height: "20rem",
          maxHeight: "20rem",
          overflowY: "scroll",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        onDrop={() => handleDrop(listNumber, false)}
        onDragOver={(e) => e.preventDefault()}
      >
        <Container sx={{ display: "flex", flexDirection: "row", g: 0, m: 0 }}>
          <TextField
            variant="standard"
            placeholder="Search"
            value={filter}
            sx={{ width: "5rem", m: 0, g: 0 }}
            onChange={handleFilterChange}
          />

          <SortByAlphaRoundedIcon
            sx={{ cursor: "pointer", ml: 1 }}
            onClick={() => sortList()}
          />
        </Container>
        {/* {openAutocomplete && (
        <MenuList sx={{ backgroundColor: "lightblue" }}>
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
          </MenuList>
        )} */}
        {list.length > 0 ? (
          list.map((item, index) => {
            if (
              !filter ||
              item.name.toUpperCase().startsWith(filter.toUpperCase())
            ) {
              return (
                <SingleItem
                  item={item}
                  dispatch={dispatch}
                  key={`${listNumber}-${index}`}
                  index={index}
                  listNumber={listNumber}
                  list={list}
                  state={state}
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
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "left",
          mb: "1rem",
          p: 0,
          g: 0
        }}
      >
        <TextField
          variant="standard"
          placeholder="New name"
          value={newItem}
          sx={{m: 0, p: 0, g: 0}}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={onKeyDownHandler}
        ></TextField>
        {newItem && (
          <AddCircleIcon
            onClick={handleAddNewItem}
            sx={{ cursor: "pointer" }}
          />
        )}
      </Container>
    </Container>
  )
}
