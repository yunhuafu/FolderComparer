import { Box } from '@mui/material'
import { CustomComponentProps } from '../CustomComponent.types'
import './informationBar.css'
import { useSelector } from 'react-redux'
import { Mode, selectMode } from '@renderer/app/modeSlice'

function InformationBar({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  const mode = useSelector(selectMode)
  if (mode === Mode.AFTER_FOLDER_SELECTION) {
    return (
      <Box sx={sx} className={className} style={style}>
        <div
          className="informationBar"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <span style={{ marginRight: '3px' }}>
            Files that have the same content but different names are grouped using
          </span>
          <span
            className="colorBlock"
            style={{ backgroundColor: '#D6F0FF', marginRight: '3px' }}
          ></span>
          <span
            className="colorBlock"
            style={{ backgroundColor: '#DFFFE0', marginRight: '3px' }}
          ></span>
          <span style={{ marginRight: '3px' }}>or</span>
          <span
            className="colorBlock"
            style={{ backgroundColor: '#FFEACF', marginRight: '3px' }}
          ></span>
          <span>backgrounds</span>
        </div>
      </Box>
    )
  } else {
    return (
      <Box sx={sx} className={className} style={style}>
        <div
          className="informationBar"
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <span
            className="colorBlock"
            style={{ backgroundColor: '#fff3cd', marginRight: '3px' }}
          ></span>
          <span style={{ marginRight: '3px' }}>Different</span>
          <span
            className="colorBlock"
            style={{ backgroundColor: '#d1c4e9', marginRight: '3px' }}
          ></span>
          <span style={{ marginRight: '3px' }}>Left/Right only</span>
        </div>
      </Box>
    )
  }
}

export default InformationBar
