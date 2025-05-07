import { createSlice } from '@reduxjs/toolkit'
import TraverseResultItem from '../../../models/TraverseResultItem'

export const comparisonResultSlice = createSlice({
  name: 'comparisonResult',
  initialState: {
    value: []
  },
  reducers: {
    setComparisonResult: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setComparisonResult } = comparisonResultSlice.actions
export const selectComparisonResult = (state): TraverseResultItem[] => state.comparisonResult.value
export default comparisonResultSlice.reducer
