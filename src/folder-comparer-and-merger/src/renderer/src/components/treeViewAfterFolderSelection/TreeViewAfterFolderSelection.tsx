import './TreeViewAfterFolderSelection.css'
import { CustomComponentProps } from '../CustomComponent.types'
import { Box } from '@mui/material'
import { forwardRef } from 'react'

type TreeViewProps = CustomComponentProps & {
  isLeft: boolean
}

const TreeView = forwardRef<HTMLDivElement, TreeViewProps>((props, ref) => {
  return (
    <Box ref={ref} {...props}>
      <div className="treeViewAfterSelectionContainer"></div>
    </Box>
  )
})

TreeView.displayName = 'TreeViewAfterSelection'

export default TreeView
