import React, { useState } from 'react'
import CompareIcon from '@mui/icons-material/Compare'
import { blue } from '@mui/material/colors'
import { TextField, Box, Button, Grid, Stack } from '@mui/material'
import { useDispatch } from 'react-redux'
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
    //dispatch(setComparisonResult(result))
  }

  return (
    <Grid container sx={sx} className={className} style={style}>
      <Grid container className="titleBarIconContainer">
        <CompareIcon sx={{ color: blue[500] }} />
      </Grid>
      <Grid container size="grow" sx={{ justifyContent: 'flex-end' }}>
        <Stack direction="row" spacing={2}>
          <Box component="section" sx={{ p: 2 }} />
          <TextField variant="outlined" value={folderPath1}></TextField>
          <Button variant="contained" id="selectFolder1" onClick={handleSelectFolder}>
            Select Folder 1
          </Button>
          <Box component="section" sx={{ p: 2 }} />
          <TextField variant="outlined" value={folderPath2}></TextField>
          <Button variant="contained" id="selectFolder2" onClick={handleSelectFolder}>
            Select Folder 2
          </Button>
          <Box component="section" sx={{ p: 2 }} />
          <Button variant="contained" onClick={handleCompareFolders}>
            Compare
          </Button>
          <Box component="section" sx={{ p: 2 }} />
          <Button variant="contained">Merge</Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default TitleBar
