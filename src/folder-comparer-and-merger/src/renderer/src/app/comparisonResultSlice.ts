import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComparisonResult, ComparisonResultType } from 'src/models/ComparisonResult'

export const comparisonResultSlice = createSlice({
  name: 'comparisonResult',
  initialState: {
    value: new ComparisonResult(null, null, ComparisonResultType.SAME, null)
  },
  reducers: {
    setComparisonResult: (state, action: PayloadAction<ComparisonResult>) => {
      state.value = action.payload
    }
  }
})

export const { setComparisonResult } = comparisonResultSlice.actions
export const selectComparisonResult = (state): ComparisonResult => state.comparisonResult.value
export default comparisonResultSlice.reducer
