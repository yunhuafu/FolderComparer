import './NavigationBar.css'
import { CustomComponentProps } from '../CustomComponent.types'
import { Box } from '@mui/material'
import CompareIcon from '@mui/icons-material/Compare'
import SettingsIcon from '@mui/icons-material/Settings'

function NavigationBar({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  return (
    <Box sx={sx} className={className} style={style}>
      <Box className="appIconContainer">
        <CompareIcon sx={{ color: '#37474f' }} />
      </Box>
      <Box
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <Box className="appIconContainer">
          <SettingsIcon sx={{ color: '#37474f' }} />
        </Box>
      </Box>
    </Box>
  )
}

export default NavigationBar
