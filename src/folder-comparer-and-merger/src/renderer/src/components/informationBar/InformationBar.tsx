import { Box } from '@mui/material'
import { CustomComponentProps } from '../CustomComponent.types'
import './informationBar.css'

function InformationBar({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  return (
    <Box sx={sx} className={className} style={style}>
      <div className="informationBar" style={{ display: 'flex', flexDirection: 'row' }}>
        <div className="colorBlock" style={{ backgroundColor: '#fff3cd' }}></div>
        <div>&nbsp;Different&nbsp;&nbsp;&nbsp;</div>
        <div className="colorBlock" style={{ backgroundColor: '#d1c4e9' }}></div>
        <div>&nbsp;Left/Right only&nbsp;&nbsp;&nbsp;</div>
      </div>
    </Box>
  )
}

export default InformationBar
