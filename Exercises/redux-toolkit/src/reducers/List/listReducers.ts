import { PayloadAction } from '@reduxjs/toolkit'
import { ListState } from './listSlice'
import { loadDataFromLocalStorage, saveDataToLocalStorageFn } from './utils'

export const listReducers = {
  initializeDataFromLocalStorage: (state: ListState) => {
    const data = loadDataFromLocalStorage()
    if (data) {
      state.lists = data.lists.map((list) =>
        list.map((item) => ({ ...item, selected: false }))
      )
    }
  },
  saveDataToLocalStorage: (state: ListState) => {
    saveDataToLocalStorageFn(state)
  },
  startDragging: (state: ListState) => {
    state.dragging = true
  },
  stopDragging: (state: ListState) => {
    state.dragging = false
  },
  selectItem: (
    state: ListState,
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
  clearSelected: (state: ListState) => {
    state.lists = state.lists.map((list) =>
      list.map((item) => ({ ...item, selected: false }))
    )
    state.selectedFrom = null
  },
  setDraggedItem: (
    state: ListState,
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
  clearDraggedItem: (state: ListState) => {
    state.draggedItems = { items: [], index: null, draggedFrom: null }
  },
  sortList: (
    state: ListState,
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
    state: ListState,
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
    state: ListState,
    action: PayloadAction<{ targetList: number; item: { name: string } }>
  ) => {
    const { targetList, item } = action.payload
    state.lists[targetList].push({ ...item, selected: false })
  },
  deleteItem: (
    state: ListState,
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
  addList: (state: ListState) => {
    state.lists.push([{ name: 'Testi', selected: false }])
  },
  deleteList: (
    state: ListState,
    action: PayloadAction<{ listIndex: number }>
  ) => {
    const { listIndex } = action.payload
    state.lists = state.lists.filter((_, index) => index !== listIndex)
  },
}
