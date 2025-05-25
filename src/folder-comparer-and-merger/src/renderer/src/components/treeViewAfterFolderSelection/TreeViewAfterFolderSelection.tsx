import './TreeViewAfterFolderSelection.css'
import { CustomComponentProps } from '../CustomComponent.types'
import { Box } from '@mui/material'
import { forwardRef } from 'react'

type TreeViewProps = CustomComponentProps & {
  isLeft: boolean
}

const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(({ isLeft, ...rest }, ref) => {
  return (
    <Box ref={ref} {...rest}>
      <div className="treeViewAfterSelectionContainer"></div>
    </Box>
  )
})

TreeView.displayName = 'TreeViewAfterSelection'

export default TreeView
