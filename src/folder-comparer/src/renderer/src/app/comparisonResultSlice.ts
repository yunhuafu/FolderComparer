import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComparisonResult } from 'src/models/ComparisonResult'

type ComparisonResultState = {
  value: ComparisonResult | null
}

export const comparisonResultSlice = createSlice({
  name: 'comparisonResult',
  initialState: { value: null } as ComparisonResultState,
  reducers: {
    setComparisonResult: (state, action: PayloadAction<ComparisonResult>) => {
      state.value = action.payload
    }
  }
})

export const { setComparisonResult } = comparisonResultSlice.actions
export const selectComparisonResult = (state): ComparisonResult => state.comparisonResult.value
export default comparisonResultSlice.reducer
