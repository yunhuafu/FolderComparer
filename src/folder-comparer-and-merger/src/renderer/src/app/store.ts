import { configureStore } from '@reduxjs/toolkit'
import comparisonResultReducer from './comparisonResultSlice'

export default configureStore({
  reducer: {
    // comparisonResult is the name of a state
    comparisonResult: comparisonResultReducer
  }
})
