import React, { useState } from 'react'
import { TextField, Box, Button, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Mode, setMode } from '@renderer/app/modeSlice'
import { setComparisonResult } from '@renderer/app/comparisonResultSlice'
import { CustomComponentProps } from '../CustomComponent.types'
import './TitleBar.css'
import { FileSystemNode } from 'src/models/FileSystemNode'
import { setFileSystemNode1 } from '@renderer/app/fileSystemNode1Slice'
import { setFileSystemNode2 } from '@renderer/app/fileSystemNode2Slice'

function TitleBar({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  const [folderPath1, setFolderPath1] = useState<string>('')
  const [folderPath2, setFolderPath2] = useState<string>('')
  const dispatch = useDispatch()

  const handleSelectFolder = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const fileSystemNode: FileSystemNode | null =
      await window.folderComparerAndMergerAPI.selectFolder()
    if (fileSystemNode) {
      dispatch(setMode(Mode.AFTER_FOLDER_SELECTION))
      const targetId: string = (event.target as HTMLElement).id
      if (targetId == 'selectFolder1') {
        setFolderPath1(fileSystemNode.fullPath)
        dispatch(setFileSystemNode1(fileSystemNode))
      } else if (targetId == 'selectFolder2') {
        setFolderPath2(fileSystemNode.fullPath)
        dispatch(setFileSystemNode2(fileSystemNode))
      }
    }
  }

  const handleCompareFolders = async (): Promise<void> => {
    const result = await window.folderComparerAndMergerAPI.compareFolders(folderPath1, folderPath2)
    dispatch(setComparisonResult(result))
    dispatch(setMode(Mode.AFTER_COMPARISON))
  }

  return (
    <Box sx={sx} className={className} style={style}>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 3 }} // 8px, 16px, 24px
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'row',
          padding: '10px',
          justifyContent: 'flex-end',
          backgroundColor: '#f5f5f5',
          flexWrap: 'wrap' // allow wrapping
        }}
      >
        <TextField required id="outlined-required" label="Required" value={folderPath1}></TextField>
        <Button
          variant="contained"
          id="selectFolder1"
          sx={{ textTransform: 'none' }}
          className="titleBarButton"
          onClick={handleSelectFolder}
        >
          Select Folder 1
        </Button>
        <TextField required id="outlined-required" label="Required" value={folderPath2}></TextField>
        <Button
          variant="contained"
          id="selectFolder2"
          sx={{ textTransform: 'none' }}
          className="titleBarButton"
          onClick={handleSelectFolder}
        >
          Select Folder 2
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: 'none' }}
          className="titleBarButton"
          onClick={handleCompareFolders}
        >
          Compare
        </Button>
        <Button variant="contained" sx={{ textTransform: 'none' }} className="titleBarButton">
          Merge
        </Button>
      </Stack>
    </Box>
  )
}

export default TitleBar
