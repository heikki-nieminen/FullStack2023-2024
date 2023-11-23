import { combineReducers } from '@reduxjs/toolkit'
import listReducer from './List/listSlice'

const rootReducer = combineReducers({
  content: listReducer,
})

export default rootReducer
