import { createSlice, PayloadAction } from '@reduxjs/toolkit'

enum Mode {
  AFTER_FOLDER_SELECTION = 'afterFolderSelection',
  AFTER_COMPARISON = 'afterComparison'
}

const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    value: Mode.AFTER_FOLDER_SELECTION
  },
  reducers: {
    setMode: (state, action: PayloadAction<Mode>) => {
      state.value = action.payload
    }
  }
})

export { Mode }
export const { setMode } = modeSlice.actions
export const selectMode = (state): Mode => state.mode.value
export default modeSlice.reducer
