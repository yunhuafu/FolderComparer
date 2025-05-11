import './TreeView.css'
import { useSelector } from 'react-redux'
import { selectComparisonResult } from '@renderer/app/comparisonResultSlice'
import { CustomComponentProps } from '../CustomComponent.types'
import { Box } from '@mui/material'
import { forwardRef } from 'react'
import FolderIcon from '@mui/icons-material/Folder'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { blue, yellow } from '@mui/material/colors'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp'

const TreeView = forwardRef<HTMLDivElement, CustomComponentProps>((props, ref) => {
  const comparisonResult = useSelector(selectComparisonResult)
  const treeNodes = comparisonResult.map((treeNode) => (
    <li
      key={treeNode.path}
      style={{ paddingLeft: `${treeNode.level * 20}px` }} // 20px per level
    >
      {treeNode.isFolder && (
        <div>
          <KeyboardArrowDownSharpIcon />
          <FolderIcon sx={{ color: yellow[500] }}></FolderIcon>
          {treeNode.name}
        </div>
      )}
      {!treeNode.isFolder && (
        <div style={{ paddingLeft: '40px' }}>
          <InsertDriveFileIcon sx={{ color: blue[500] }}></InsertDriveFileIcon>
          {treeNode.name}
        </div>
      )}
    </li>
  ))

  return (
    <Box ref={ref} {...props}>
      <div className="treeViewContainer">
        <ul>{treeNodes}</ul>
      </div>
    </Box>
  )
})

TreeView.displayName = 'TreeView'

export default TreeView
