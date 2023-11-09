import './App.css'
import {
  Container,
  List,
  ListItem,
  MenuItem,
  MenuList,
  Paper,
  TextField,
} from "@mui/material"
import { useState } from "react"
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft"
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import SortByAlphaRoundedIcon from "@mui/icons-material/SortByAlphaRounded"

const App = () => {
  const [listOne, setListOne] = useState([
    { name: "Aino", selected: false },
    { name: "Eetu", selected: false },
    { name: "Emilia", selected: false },
    { name: "Onni", selected: false },
    { name: "Aada", selected: false },
    { name: "Mikael", selected: false },
    { name: "Hanna", selected: false },
    { name: "Matias", selected: false },
    { name: "Emma", selected: false },
    { name: "Oliver", selected: false },
    { name: "Venla", selected: false },
    { name: "Joona", selected: false },
    { name: "Iida", selected: false },
    { name: "Aleksi", selected: false },
    { name: "Helmi", selected: false },
    { name: "Niko", selected: false },
    { name: "Siiri", selected: false },
    { name: "Lauri", selected: false },
    { name: "Elina", selected: false },
    { name: "Elias", selected: false },
    { name: "Kaisa", selected: false },
    { name: "Anton", selected: false },
    { name: "Veera", selected: false },
    { name: "Juho", selected: false },
    { name: "Sofia", selected: false },
    { name: "Tuomas", selected: false },
    { name: "Anni", selected: false },
    { name: "Topias", selected: false },
    { name: "Lotta", selected: false },
    { name: "Joel", selected: false },
    { name: "Satu", selected: false },
    { name: "Oskari", selected: false },
    { name: "Laura", selected: false },
    { name: "Arttu", selected: false },
    { name: "Eveliina", selected: false },
    { name: "Santeri", selected: false },
    { name: "Milla", selected: false },
    { name: "Daniel", selected: false },
    { name: "Henna", selected: false },
    { name: "Ville", selected: false },
    { name: "Sara", selected: false },
    { name: "Matti", selected: false },
    { name: "Noora", selected: false },
    { name: "Lauri", selected: false },
    { name: "Elisa", selected: false },
    { name: "Antti", selected: false },
    { name: "Maria", selected: false },
    { name: "Joonas", selected: false },
    { name: "Netta", selected: false },
    { name: "Janne", selected: false },
  ])

  const [listTwo, setListTwo] = useState([])

  const handleButtonClick = (direction) => {
    let updatedListOne, updatedListTwo
    if (direction == "lefttoright") {
      updatedListOne = listOne.filter((item) => !item.selected)
      let selected = listOne.filter((item) => item.selected)
      updatedListTwo = [...listTwo, ...selected]
    } else {
      updatedListTwo = listTwo.filter((item) => !item.selected)
      let selected = listTwo.filter((item) => item.selected)
      updatedListOne = [...listOne, ...selected]
    }
    updatedListOne = updatedListOne.map((item) => ({
      ...item,
      selected: false,
    }))
    updatedListTwo = updatedListTwo.map((item) => ({
      ...item,
      selected: false,
    }))
    setListOne(updatedListOne)
    setListTwo(updatedListTwo)
  }

  const [draggedPerson, setDraggedPerson] = useState(null)

  const handleDrop = (listNumber) => {
    let updatedListOne, updatedListTwo
    if (listNumber != draggedPerson.draggedFrom) {
      if (draggedPerson.draggedFrom == 1) {
        updatedListOne = listOne.filter(
          (item) => !draggedPerson.persons.includes(item)
        )
        updatedListTwo = [...listTwo, ...draggedPerson.persons]
      } else {
        updatedListTwo = listTwo.filter(
          (item) => !draggedPerson.persons.includes(item)
        )
        updatedListOne = [...listOne, ...draggedPerson.persons]
      }
      updatedListOne = updatedListOne.map((item) => ({
        ...item,
        selected: false,
      }))
      updatedListTwo = updatedListTwo.map((item) => ({
        ...item,
        selected: false,
      }))
      setListOne(updatedListOne)
      setListTwo(updatedListTwo)
      setDraggedPerson(null)
    }
  }

  return (
    <Paper sx={{ display: "flex", flexDirection: "row" }}>
      <SingleList
        list={listOne}
        setList={setListOne}
        setDraggedPerson={setDraggedPerson}
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
            handleButtonClick()
          }}
        />
        <ArrowRightIcon
          sx={{ fontSize: "6rem", cursor: "pointer" }}
          onClick={() => {
            handleButtonClick("lefttoright")
          }}
        />
      </Container>
      <SingleList
        list={listTwo}
        setList={setListTwo}
        setDraggedPerson={setDraggedPerson}
        listNumber={2}
        handleDrop={handleDrop}
        draggedPerson={draggedPerson}
      />
    </Paper>
  )
}

const SingleName = ({
  person,
  index,
  selectHandler,
  setDraggedPerson,
  listNumber,
  list,
}) => {
  const [dragging, setDragging] = useState(false)

  const handleDragStart = () => {
    const selectedPersons = list.filter((item) => item.selected)
    setDraggedPerson({
      persons: selectedPersons.length > 0 ? selectedPersons : [person],
      index: index,
      draggedFrom: listNumber,
    })
    setDragging(true)
  }

  const handleDragEnd = () => {
    setDragging(false)
    setDraggedPerson(null)
  }

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
        person.selected && {
          backgroundColor: "green",
        },
      ]}
      onClick={(e) => {
        e.preventDefault()
        selectHandler(!person.selected, index)
      }}
    >
      {person.name}
    </ListItem>
  )
}

const SingleList = ({
  list,
  setList,
  setDraggedPerson,
  listNumber,
  handleDrop,
  draggedPerson,
}) => {
  const [sortDirectionAsc, setSortDirectionAsc] = useState(true)
  const [filter, setFilter] = useState("")
  const [filterList, setFilterList] = useState(null)
  const [openAutocomplete, setOpenAutocomplete] = useState(false)

  const selectHandler = (value, index) => {
    let updatedList = [...list]
    updatedList[index].selected = value
    setList(updatedList)
  }

  const sortList = () => {
    let updatedList
    if (sortDirectionAsc) {
      updatedList = list.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA > nameB) return 1
        if (nameA < nameB) return -1
        return 0
      })
    } else {
      updatedList = list.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA > nameB) return -1
        if (nameA < nameB) return 1
        return 0
      })
    }
    setSortDirectionAsc(!sortDirectionAsc)
    setList(updatedList)
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

      /*  if (autoCompleteList.length == 1) {
        setFilter(autoCompleteList[0].name)
      } */

      setFilterList(autoCompleteList)
      setOpenAutocomplete(true)
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
              <SingleName
                person={item}
                key={`${listNumber}-${index}`}
                index={index}
                listNumber={listNumber}
                selectHandler={selectHandler}
                setDraggedPerson={setDraggedPerson}
                list={list}
                draggedPerson={draggedPerson}
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

export default App
