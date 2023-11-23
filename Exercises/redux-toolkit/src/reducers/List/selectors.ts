import { RootState } from '../../app/store'

export const selectSingleList = (state: RootState, index: number) =>
  state.root.content.lists[index]

export const selectSingleItem =
  (index: number, listIndex: number) => (state: RootState) =>
    state.root.content.lists[listIndex][index]

export const selectDraggingInfo = (state: RootState) =>
  state.root.content.dragging

export const selectSelectedId = (state: RootState) =>
  state.root.content.selectedFrom

export const selectDraggedFromId = (state: RootState) =>
  state.root.content.draggedItems.draggedFrom

export const selectLists = (state: RootState) => state.root.content.lists
