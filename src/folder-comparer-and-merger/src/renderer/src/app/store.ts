import { configureStore } from '@reduxjs/toolkit'
import modeReducer from './modeSlice'
import comparisonResultReducer from './comparisonResultSlice'

export default configureStore({
  reducer: {
    mode: modeReducer,
    // comparisonResult is the name of a state
    comparisonResult: comparisonResultReducer
  }
})
