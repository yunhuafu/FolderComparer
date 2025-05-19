import React, { useState } from 'react'
import { TextField, Box, Button, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
import { Mode, setMode } from '@renderer/app/modeSlice'
import { setComparisonResult } from '@renderer/app/comparisonResultSlice'
import { CustomComponentProps } from '../CustomComponent.types'
import './TitleBar.css'

function TitleBar({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  const [folderPath1, setFolderPath1] = useState<string>('')
  const [folderPath2, setFolderPath2] = useState<string>('')
  const dispatch = useDispatch()

  const handleSelectFolder = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    const path = await window.folderComparerAndMergerAPI.selectFolder()
    const targetId: string = (event.target as HTMLElement).id
    if (path) {
      if (targetId == 'selectFolder1') setFolderPath1(path)
      else if (targetId == 'selectFolder2') setFolderPath2(path)
    }
  }

  const handleCompareFolders = async (): Promise<void> => {
    const result = await window.folderComparerAndMergerAPI.compareFolders(folderPath1, folderPath2)
    dispatch(setComparisonResult(result))
    dispatch(setMode(Mode.AFTER_COMPARISON))
  }

  return (
    <Box sx={sx} className={className} style={style}>
      <Box
        style={{
          flex: '1',
          display: 'flex',
          flexDirection: 'row',
          padding: '10px',
          justifyContent: 'flex-end',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Stack direction="row" spacing={2}>
          <Box component="section" sx={{ p: 2 }} />
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={folderPath1}
          ></TextField>
          <Button
            variant="contained"
            id="selectFolder1"
            sx={{ textTransform: 'none' }}
            className="titleBarButton"
            onClick={handleSelectFolder}
          >
            Select Folder 1
          </Button>
          <Box component="section" sx={{ p: 2 }} />
          <TextField
            required
            id="outlined-required"
            label="Required"
            value={folderPath2}
          ></TextField>
          <Button
            variant="contained"
            id="selectFolder2"
            sx={{ textTransform: 'none' }}
            className="titleBarButton"
            onClick={handleSelectFolder}
          >
            Select Folder 2
          </Button>
          <Box component="section" sx={{ p: 2 }} />
          <Button
            variant="contained"
            sx={{ textTransform: 'none' }}
            className="titleBarButton"
            onClick={handleCompareFolders}
          >
            Compare
          </Button>
          <Box component="section" sx={{ p: 2 }} />
          <Button variant="contained" sx={{ textTransform: 'none' }} className="titleBarButton">
            Merge
          </Button>
        </Stack>
      </Box>
    </Box>
  )
}

export default TitleBar
