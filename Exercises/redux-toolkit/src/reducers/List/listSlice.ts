import { createSlice } from '@reduxjs/toolkit'

import { listReducers } from './listReducers' // Import your additional reducers

export interface ListItemProp {
  name: string
  selected: boolean
}

export interface ListState {
  lists: ListItemProp[][]
  draggedItems: {
    items: ListItemProp[]
    index: number | null
    draggedFrom: number | null
  }
  dragging: boolean
  selectedFrom: number | null
}

const initialState: ListState = {
  lists: [
    [
      { name: 'Aino', selected: false },
      { name: 'Eetu', selected: false },
      { name: 'Emilia', selected: false },
      { name: 'Onni', selected: false },
      { name: 'Aada', selected: false },
      { name: 'Mikael', selected: false },
      { name: 'Hanna', selected: false },
      { name: 'Matias', selected: false },
      { name: 'Emma', selected: false },
      { name: 'Ville', selected: false },
    ],
    [
      { name: 'Janne', selected: false },
      { name: 'Seppo', selected: false },
    ],
    [],
  ],
  draggedItems: { items: [], index: null, draggedFrom: null },
  dragging: false,
  selectedFrom: null,
}

export const listSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    ...listReducers,
  },
})

export const {
  startDragging,
  stopDragging,
  selectItem,
  setDraggedItem,
  clearDraggedItem,
  sortList,
  moveItems,
  addItem,
  deleteItem,
  initializeDataFromLocalStorage,
  saveDataToLocalStorage,
  clearSelected,
  addList,
  deleteList,
} = listSlice.actions

export default listSlice.reducer
