import React from 'react';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import { Card } from '@mui/material';

function TitleBar() {
  return (
    <Card>
        <KeyboardArrowRightSharpIcon/> 
        <KeyboardArrowDownSharpIcon/>
  </Card>  
);
}

export default TitleBar;