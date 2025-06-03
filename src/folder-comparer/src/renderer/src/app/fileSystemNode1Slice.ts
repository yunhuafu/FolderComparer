import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FileSystemNode } from 'src/models/FileSystemNode'

type FileSystemNodeState = {
  value: FileSystemNode | null
}

export const fileSystemNode1Slice = createSlice({
  name: 'fileSystemNode1',
  initialState: { value: null } as FileSystemNodeState,
  reducers: {
    setFileSystemNode1: (state, action: PayloadAction<FileSystemNode>) => {
      state.value = action.payload
    }
  }
})

export const { setFileSystemNode1 } = fileSystemNode1Slice.actions
export const selectFileSystemNode1 = (state): FileSystemNode => state.fileSystemNode1.value
export default fileSystemNode1Slice.reducer
