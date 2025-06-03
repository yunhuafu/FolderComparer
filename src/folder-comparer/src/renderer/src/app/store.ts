import { configureStore } from '@reduxjs/toolkit'
import modeReducer from './modeSlice'
import fileSystemNode1Reducer from './fileSystemNode1Slice'
import fileSystemNode2Reducer from './fileSystemNode2Slice'
import comparisonResultReducer from './comparisonResultSlice'

export default configureStore({
  reducer: {
    mode: modeReducer,
    fileSystemNode1: fileSystemNode1Reducer,
    fileSystemNode2: fileSystemNode2Reducer,
    comparisonResult: comparisonResultReducer
  }
})
