import { createSlice } from '@reduxjs/toolkit'

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
export const selectComparisonResult = (state): object[] => state.comparisonResult.value
export default comparisonResultSlice.reducer
