import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

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

export const loadDataFromLocalStorage = (): ListState | null => {
  try {
    const storedData: string | null = localStorage.getItem('listData')
    if (storedData) {
      const parsedData: ListState = JSON.parse(storedData)
      return parsedData
    }
  } catch (err) {
    console.error('Error loading data from localStorage:', err)
  }
  return null
}

export const saveDataToLocalStorage = (data: ListState): void => {
  try {
    const serializedData = JSON.stringify(data)
    localStorage.setItem('listData', serializedData)
  } catch (err) {
    console.error('Error saving data to localStorage:', err)
  }
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
  ],
  draggedItems: { items: [], index: null, draggedFrom: null },
  dragging: false,
  selectedFrom: null,
}

export const listSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    initializeData: (state) => {
      const data = loadDataFromLocalStorage()
      if (data) {
        state.lists = data.lists.map((list) =>
          list.map((item) => ({ ...item, selected: false }))
        )
      }
    },
    saveData: (state) => {
      saveDataToLocalStorage(state)
    },
    startDragging: (state) => {
      state.dragging = true
    },
    stopDragging: (state) => {
      state.dragging = false
    },
    selectItem: (
      state,
      action: PayloadAction<{
        listIndex: number
        itemIndex: number
      }>
    ) => {
      const { listIndex, itemIndex } = action.payload
      if (
        listIndex >= 0 &&
        listIndex < state.lists.length &&
        itemIndex >= 0 &&
        itemIndex < state.lists[listIndex].length
      ) {
        state.lists[listIndex][itemIndex].selected =
          !state.lists[listIndex][itemIndex].selected
      }
      state.selectedFrom = listIndex
      state.lists = state.lists.map((list, index) =>
        index !== listIndex
          ? list.map((item) => ({ ...item, selected: false }))
          : list
      )
      const hasSelected = state.lists[listIndex].some((item) => item.selected)
      if (!hasSelected) state.selectedFrom = null
    },
    clearSelected: (state) => {
      state.lists = state.lists.map((list) =>
        list.map((item) => ({ ...item, selected: false }))
      )
      state.selectedFrom = null
    },
    setDraggedItem: (
      state,
      action: PayloadAction<{
        listIndex: number
        itemIndex: number
      }>
    ) => {
      const { listIndex, itemIndex } = action.payload
      state.lists[listIndex][itemIndex].selected = true
      state.lists = state.lists.map((list, index) => {
        return index !== listIndex
          ? list.map((item) => ({
              ...item,
              selected: false,
            }))
          : list
      })
      state.selectedFrom = listIndex
    },
    clearDraggedItem: (state) => {
      state.draggedItems = { items: [], index: null, draggedFrom: null }
    },
    sortList: (
      state,
      action: PayloadAction<{
        listIndex: number
        sortDirectionAsc: boolean
      }>
    ) => {
      const { listIndex, sortDirectionAsc } = action.payload
      state.lists[listIndex] = state.lists[listIndex].sort((a, b) => {
        const aName = a.name.toUpperCase()
        const bName = b.name.toUpperCase()

        return sortDirectionAsc
          ? aName > bName
            ? 1
            : bName > aName
            ? -1
            : 0
          : aName > bName
          ? -1
          : bName > aName
          ? 1
          : 0
      })
    },
    moveItems: (
      state,
      action: PayloadAction<{ sourceList: number | null; targetList: number }>
    ) => {
      const { sourceList, targetList } = action.payload
      console.log('sourceList:', sourceList)
      if (sourceList !== null) {
        state.lists[targetList] = [
          ...state.lists[targetList],
          ...state.lists[sourceList].filter((item) => item.selected),
        ]
        state.lists[sourceList] = state.lists[sourceList].filter(
          (item) => !item.selected
        )
        state.lists[targetList] = state.lists[targetList].map((item) => ({
          name: item.name,
          selected: false,
        }))
        state.selectedFrom = null
      } else {
        console.log('Drag&drop')
        state.lists[targetList] = [
          ...state.lists[targetList],
          ...state.draggedItems.items,
        ]
      }
    },
    addItem: (
      state,
      action: PayloadAction<{ targetList: number; item: { name: string } }>
    ) => {
      const { targetList, item } = action.payload
      state.lists[targetList].push({ ...item, selected: false })
    },
    deleteItem: (
      state,
      action: PayloadAction<{ sourceList: number | null }>
    ) => {
      const { sourceList } = action.payload
      console.log('sourceList:', sourceList)
      if (sourceList !== null) {
        state.lists[sourceList] = state.lists[sourceList].filter(
          (item) => !item.selected
        )
      }
      state.selectedFrom = null
    },
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
  initializeData,
  saveData,
  clearSelected,
} = listSlice.actions

export const selectState = (state: RootState) => state

export const selectSingleList = (state: RootState, index: number) =>
  state.content.lists[index]

export const selectDraggingInfo = (state: RootState) => state.content.dragging

export default listSlice.reducer
