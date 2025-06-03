import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileSystemNode } from 'src/models/FileSystemNode'

type FileSystemNodeState = {
  value: FileSystemNode | null
}

export const fileSystemNode2Slice = createSlice({
  name: 'fileSystemNode2',
  initialState: { value: null } as FileSystemNodeState,
  reducers: {
    setFileSystemNode2: (state, action: PayloadAction<FileSystemNode>) => {
      state.value = action.payload
    }
  }
})

export const { setFileSystemNode2 } = fileSystemNode2Slice.actions
export const selectFileSystemNode2 = (state): FileSystemNode => state.fileSystemNode2.value
export default fileSystemNode2Slice.reducer
