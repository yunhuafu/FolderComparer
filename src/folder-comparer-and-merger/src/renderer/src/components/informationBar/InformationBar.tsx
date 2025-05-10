import { Box } from '@mui/material'
import { CustomComponentProps } from '../CustomComponent.types'
import './informationBar.css'

function InformationBar({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  return (
    <Box sx={sx} className={className} style={style}>
      <div className="informationBar">Information</div>
    </Box>
  )
}

export default InformationBar
