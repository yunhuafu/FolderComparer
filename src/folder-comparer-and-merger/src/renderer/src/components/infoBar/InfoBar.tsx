import { Box } from '@mui/material'
import { CustomComponentProps } from '../CustomComponent.types'

function InformationBar({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  return (
    <Box sx={sx} className={className} style={style}>
      Information Bar
    </Box>
  )
}

export default InformationBar
