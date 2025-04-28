import React, { useState } from 'react';
import CompareIcon from '@mui/icons-material/Compare';
import { blue } from '@mui/material/colors';
import { TextField, Box, Button, Grid, Stack } from '@mui/material'

function TitleBar() {
  const [folderPath1, setFolderPath1] = useState<string>('');
  const [folderPath2, setFolderPath2] = useState<string>('');

  const handleSelectFolder = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const path = await window.electronAPI.selectFolder();
    if (path){
      if ((event.target as HTMLElement).id == "selectFolder1")
        setFolderPath1(path);
      else if ((event.target as HTMLElement).id == "selectFolder2")
        setFolderPath2(path);
    }
  };

  const handleCompareFolders = async () => {
    const result = await window.electronAPI.compareFolders(folderPath1, folderPath2);
    alert(result);
  };



  return (
    <Grid container>
        <Grid container sx={{justifyContent: "flex-start", alignItems:"center"}}>
          <CompareIcon sx={{ color: blue[500] }}/>
        </Grid>
       
        <Grid container size="grow" sx={{justifyContent: "flex-end"}}>
            <Stack direction="row" spacing={2}>
                <Box component="section" sx={{ p: 2}}/>
                <TextField variant="outlined"
                  value = {folderPath1} ></TextField>
                <Button variant="contained" 
                  id = "selectFolder1" onClick={handleSelectFolder}>Select Folder 1</Button>
                <Box component="section" sx={{ p: 2}}/>
                <TextField variant="outlined"
                  value = {folderPath1} ></TextField>
                <Button variant="contained" 
                  id = "selectFolder2" onClick={handleSelectFolder}>Select Folder 2</Button>
                <Box component="section" sx={{ p: 2}}/>
                <Button variant="contained" onClick={handleCompareFolders}>Compare</Button>
                <Box component="section" sx={{ p: 2}}/>
                <Button variant="contained">Merge</Button>
            </Stack>
        </Grid>
    </Grid>
  );
}

export default TitleBar;