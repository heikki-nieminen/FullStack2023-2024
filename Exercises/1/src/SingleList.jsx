import { SingleItem } from "./SingleItem.jsx"
import { Container, List, TextField, MenuList, MenuItem } from "@mui/material"
import * as types  from "./reducer/actions.jsx"
import { useState } from "react"
import SortByAlphaRoundedIcon from "@mui/icons-material/SortByAlphaRounded"

export const SingleList = ({
    list,
    listNumber,
    handleDrop,
    dispatch
  }) => {
    const [sortDirectionAsc, setSortDirectionAsc] = useState(true)
    const [filter, setFilter] = useState("")
    const [filterList, setFilterList] = useState(null)
    const [openAutocomplete, setOpenAutocomplete] = useState(false)
  
    const sortList = () => {
      dispatch({type: types.SORT_LIST, payload: {sortDirectionAsc: sortDirectionAsc, listNumber: listNumber}})
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
  
    return (
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
        onDrop={() => handleDrop(listNumber)}
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
        {openAutocomplete && (
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
        )}
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
                />
              )
            }
          })
        ) : (
          <>This list has no items.</>
        )}
      </List>
    )
  }