import React, { useState } from 'react'
import { TextField, Box, Button, Stack, InputAdornment } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Mode, setMode } from '@renderer/app/modeSlice'
import { setComparisonResult } from '@renderer/app/comparisonResultSlice'
import { CustomComponentProps } from '../CustomComponent.types'
import './TitleBar.css'
import { FileSystemNode } from 'src/models/FileSystemNode'
import { setFileSystemNode1 } from '@renderer/app/fileSystemNode1Slice'
import { setFileSystemNode2 } from '@renderer/app/fileSystemNode2Slice'
import FolderIcon from '@mui/icons-material/Folder'
import { yellow } from '@mui/material/colors'

function TitleBar({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  const [folderPath1, setFolderPath1] = useState<string>('')
  const [folderPath2, setFolderPath2] = useState<string>('')
  const dispatch = useDispatch()

  const handleSelectFolder = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const fileSystemNode: FileSystemNode | null = await window.folderComparerAPI.selectFolder()
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
    const result = await window.folderComparerAPI.compareFolders(folderPath1, folderPath2)
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
        <TextField
          id="folderPath1TextField"
          label="Folder 1"
          variant="standard"
          value={folderPath1}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FolderIcon sx={{ color: yellow[500] }}></FolderIcon>
                </InputAdornment>
              )
            }
          }}
        ></TextField>
        <Button
          variant="contained"
          id="selectFolder1"
          sx={{ textTransform: 'none' }}
          className="titleBarButton"
          onClick={handleSelectFolder}
        >
          Browse
        </Button>
        <TextField
          id="folderPath2TextField"
          label="Folder 2"
          variant="standard"
          value={folderPath2}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FolderIcon sx={{ color: yellow[500] }}></FolderIcon>
                </InputAdornment>
              )
            }
          }}
        ></TextField>
        <Button
          variant="contained"
          id="selectFolder2"
          sx={{ textTransform: 'none' }}
          className="titleBarButton"
          onClick={handleSelectFolder}
        >
          Browse
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: 'none' }}
          className="titleBarButton"
          onClick={handleCompareFolders}
        >
          Compare
        </Button>
      </Stack>
    </Box>
  )
}

export default TitleBar
