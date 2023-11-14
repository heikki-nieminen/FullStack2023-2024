import * as types from "./actions.jsx"

export const reducer = (state, action) => {
  let deepCopy = JSON.parse(JSON.stringify(state))
  console.log("ACTION TYPE: ", action)
  switch (action.type) {
    /*     case types.MOVE_ITEM_FROM_LEFT_TO_RIGHT: {
      let updatedListOne, updatedListTwo
      updatedListOne = deepCopy.lists.listOne.filter((item) => !item.selected)
      let selected = deepCopy.lists.listOne.filter((item) => item.selected)
      updatedListTwo = [...deepCopy.lists.listTwo, ...selected]
      updatedListOne = updatedListOne.map((item) => ({
        ...item,
        selected: false,
      }))
      updatedListTwo = updatedListTwo.map((item) => ({
        ...item,
        selected: false,
      }))
      let updatedState = {
        ...deepCopy,
        lists: {
          ...deepCopy.lists,
          listOne: updatedListOne,
          listTwo: updatedListTwo,
        },
      }
      return updatedState
    }
    case types.MOVE_ITEM_FROM_RIGHT_TO_LEFT: {
      let updatedListOne, updatedListTwo
      updatedListTwo = deepCopy.lists.listTwo.filter((item) => !item.selected)
      let selected = deepCopy.lists.listTwo.filter((item) => item.selected)
      updatedListOne = [...deepCopy.lists.listOne, ...selected]
      updatedListOne = updatedListOne.map((item) => ({
        ...item,
        selected: false,
      }))
      updatedListTwo = updatedListTwo.map((item) => ({
        ...item,
        selected: false,
      }))
      let updatedState = {
        ...deepCopy,
        lists: {
          ...deepCopy.lists,
          listOne: updatedListOne,
          listTwo: updatedListTwo,
        },
      }
      return updatedState
    } */
    case types.SET_DRAGGED_ITEM: {
      if (action.payload.draggedFrom === 1) {
        deepCopy.lists.listOne[action.payload.index].selected = true
      } else {
        deepCopy.lists.listTwo[action.payload.index].selected = true
      }
      return { ...deepCopy, draggedItems: action.payload }
    }
    case types.CLEAR_DRAGGED_ITEM: {
      return {
        ...state,
        draggedItems: { items: [], index: null, draggedFrom: null },
      }
    }

    /* case types.DROP_DRAGGED_ITEM: {
      let updatedListOne, updatedListTwo
      let draggedItems = state.draggedItems
      if (draggedItems.draggedFrom === 1) {
        updatedListOne = deepCopy.lists.listOne.filter(
          (item) =>
            !draggedItems.items.some(
              (draggedItem) => draggedItem.name === item.name
            )
        )
        updatedListTwo = [...deepCopy.lists.listTwo, ...draggedItems.items]
      } else {
        updatedListTwo = deepCopy.lists.listTwo.filter(
          (item) =>
            !draggedItems.items.some(
              (draggedItem) => draggedItem.name === item.name
            )
        )
        updatedListOne = [...deepCopy.lists.listOne, ...draggedItems.items]
      }
      updatedListOne = updatedListOne.map((item) => ({
        ...item,
        selected: false,
      }))
      updatedListTwo = updatedListTwo.map((item) => ({
        ...item,
        selected: false,
      }))
      return {
        ...state,
        lists: { listOne: updatedListOne, listTwo: updatedListTwo },
      }
    } */

    case types.SELECT_ITEM: {
      if (action.payload.listNumber === 1) {
        deepCopy.lists.listOne[action.payload.index].selected =
          action.payload.selected
        return deepCopy
      } else {
        deepCopy.lists.listTwo[action.payload.index].selected =
          action.payload.selected
        return deepCopy
      }
    }
    case types.SORT_LIST: {
      let listCopy
      if (action.payload.listNumber === 1) {
        listCopy = deepCopy.lists.listOne
      } else {
        listCopy = deepCopy.lists.listTwo
      }
      let sorted

      sorted = listCopy.sort((a, b) => {
        const aName = a.name.toUpperCase()
        const bName = b.name.toUpperCase()
        if (action.payload.sortDirectionAsc) {
          if (aName > bName) return 1
          if (bName > aName) return -1
          return 0
        }
        if (aName > bName) return -1
        if (bName > aName) return 1
        return 0
      })

      if (action.payload.listNumber === 1) {
        return { ...state, lists: { ...state.lists, listOne: sorted } }
      } else {
        return { ...state, lists: { ...state.lists, listTwo: sorted } }
      }
    }
    case types.MOVE_ITEMS: {
      console.log("Moving items")
      let updatedListOne, updatedListTwo
      const sourceList =
        action.payload?.sourceList | deepCopy.draggedItems.draggedFrom
      if (sourceList === 1) {
        let selected = deepCopy.lists.listOne.filter((item) => item.selected)
        updatedListTwo = [...deepCopy.lists.listTwo, ...selected]
        updatedListOne = deepCopy.lists.listOne.filter((item) => !item.selected)
      } else {
        let selected = deepCopy.lists.listTwo.filter((item) => item.selected)
        updatedListOne = [...deepCopy.lists.listOne, ...selected]

        updatedListTwo = deepCopy.lists.listTwo.filter((item) => !item.selected)
      }
      updatedListOne = updatedListOne.map((item) => ({
        ...item,
        selected: false,
      }))
      updatedListTwo = updatedListTwo.map((item) => ({
        ...item,
        selected: false,
      }))
      console.log("updatedListTwo:", updatedListTwo)
      return {
        ...state,
        lists: { listOne: updatedListOne, listTwo: updatedListTwo },
      }
    }

    default: {
      console.error("VIRHE")
    }
  }
}

export const initialState = {
  lists: {
    listOne: [
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
    ],
    listTwo: [{ name: "Janne", selected: false }],
  },
  draggedItems: { items: [], index: null, draggedFrom: null },
}
