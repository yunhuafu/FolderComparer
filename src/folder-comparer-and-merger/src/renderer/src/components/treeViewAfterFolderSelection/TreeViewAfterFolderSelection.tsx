import './TreeViewAfterFolderSelection.css'
import { CustomComponentProps } from '../CustomComponent.types'
import { Box } from '@mui/material'
import { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { selectFileSystemNode1 } from '@renderer/app/fileSystemNode1Slice'
import { selectFileSystemNode2 } from '@renderer/app/fileSystemNode2Slice'

type TreeViewProps = CustomComponentProps & {
  isLeft: boolean
}

const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(({ isLeft, ...rest }, ref) => {
  const fileSystemNode1 = useSelector(selectFileSystemNode1)
  const fileSystemNode2 = useSelector(selectFileSystemNode2)

  return (
    <Box ref={ref} {...rest}>
      <div className="treeViewAfterSelectionContainer"></div>
    </Box>
  )
})

TreeView.displayName = 'TreeViewAfterSelection'

export default TreeView
