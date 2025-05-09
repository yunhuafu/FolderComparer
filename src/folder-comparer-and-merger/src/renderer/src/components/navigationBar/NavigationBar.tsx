import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp'
import './NavigationBar.css'
import { CustomComponentProps } from '../CustomComponent.types'
import { Box } from '@mui/material'

function NavigationBar({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  const show = false
  return (
    <Box sx={sx} className={className} style={style}>
      <div className="navigationBarContainer">
        <KeyboardArrowDownSharpIcon />
      </div>
      {show && (
        <div>
          <KeyboardArrowRightSharpIcon />
        </div>
      )}
    </Box>
  )
}

export default NavigationBar
