import { Box } from '@mui/material'
import { CustomComponentProps } from '../CustomComponent.types'
import NavigationBar from '../navigationBar/NavigationBar'
import TreeView from '../treeView/TreeView'

function mainWindow({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  return (
    <Box sx={sx} className={className} style={style}>
      <NavigationBar />
      <TreeView style={{ flex: '1 1 auto', overflow: 'auto' }}></TreeView>
      <TreeView style={{ flex: '1 1 auto', overflow: 'auto' }}></TreeView>
    </Box>
  )
}

export default mainWindow
