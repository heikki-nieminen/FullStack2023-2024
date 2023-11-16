import * as types from "./actions.jsx"

export const reducer = (state, action) => {

  let deepCopy = JSON.parse(JSON.stringify(state))
  console.log("ACTION TYPE: ", action.type)

  switch (action.type) {
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
        ...deepCopy,
        draggedItems: { items: [], index: null, draggedFrom: null },
      }
    }

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
        return { ...deepCopy, lists: { ...deepCopy.lists, listOne: sorted } }
      } else {
        return { ...deepCopy, lists: { ...deepCopy.lists, listTwo: sorted } }
      }
    }

    case types.MOVE_ITEMS: {
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

      return {
        ...deepCopy,
        lists: { listOne: updatedListOne, listTwo: updatedListTwo },
      }
    }
    case types.START_DRAGGING : {
      console.log("Started dragging")
      return {...deepCopy, dragging:true}
    }
    case types.STOP_DRAGGING : {
      console.log("Stopped dragging")
      return {...deepCopy, dragging:false}
    }
    case types.INITIALIZE_DATA : {
      console.log("STATE:",state)
      console.log("STORAGE:",action.payload.data)
      return action.payload.data
    }
    case types.ADD_ITEM : {
      if(action.payload.listNumber === 1){
        deepCopy.lists.listOne.push({...action.payload.item, selected: false})
      }
      else {
        deepCopy.lists.listTwo.push({...action.payload.item, selected: false})
      }
      return deepCopy
    }
    
    case types.DELETE_ITEMS : {
      if(action.payload.sourceList === 0){
        const updatedListOne = deepCopy.lists.listOne.filter((item)=>!item.selected)
        const updatedListTwo = deepCopy.lists.listTwo.filter((item)=>!item.selected)
        return {...deepCopy, lists: {listOne: updatedListOne, listTwo: updatedListTwo}}
      }
      if(deepCopy.draggedItems.draggedFrom === 1){

      }
    }

    default: {
      console.error("Unknown action type:", action.type)
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
      { name: "Janne", selected: false },
    ],
    listTwo: [
      { name: "Janne", selected: false },
      { name: "Janne", selected: false },
    ],
  },
  draggedItems: { items: [], index: null, draggedFrom: null },
  dragging: false,
}

// Vanhat
/*case types.MOVE_ITEM_FROM_LEFT_TO_RIGHT: {
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
    }*/

// Vanhaa
/*case types.DROP_DRAGGED_ITEM: {
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
    }*/
