import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
import { Card } from '@mui/material';

function NavigationBar(): React.JSX.Element {
  return (
    <Card>
      <KeyboardArrowRightSharpIcon />
      <KeyboardArrowDownSharpIcon />
    </Card>
  )
}

export default NavigationBar