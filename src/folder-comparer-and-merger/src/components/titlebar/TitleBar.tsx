import React from 'react';
import CompareIcon from '@mui/icons-material/Compare';
import { blue } from '@mui/material/colors';
import { TextField, Box, Button, Grid, Stack } from '@mui/material'

function TitleBar() {
  return (
    <Grid container>
        <Grid container sx={{justifyContent: "flex-start", alignItems:"center"}}>
          <CompareIcon sx={{ color: blue[500] }}/>
        </Grid>
       
        <Grid container size="grow" sx={{justifyContent: "flex-end"}}>
            <Stack direction="row" spacing={2}>
                <Box component="section" sx={{ p: 2}}/>
                <TextField variant="outlined"></TextField>
                <Button variant="contained">Select Folder 1</Button>
                <Box component="section" sx={{ p: 2}}/>
                <TextField variant="outlined"></TextField>
                <Button variant="contained">Select Folder 2</Button>
                <Box component="section" sx={{ p: 2}}/>
                <Button variant="contained">Compare</Button>
                <Box component="section" sx={{ p: 2}}/>
                <Button variant="contained">Merge</Button>
            </Stack>
        </Grid>
    </Grid>
  );
}

export default TitleBar;