import './TreeView.css'
import { useSelector } from 'react-redux'
import { selectComparisonResult } from '@renderer/app/comparisonResultSlice'
import { CustomComponentProps } from '../CustomComponent.types'
import { Box } from '@mui/material'
import { forwardRef } from 'react'

const TreeView = forwardRef<HTMLDivElement, CustomComponentProps>((props, ref) => {
  const comparisonResult = useSelector(selectComparisonResult)
  const treeNodes = comparisonResult.map((treeNode) => (
    <li
      key={treeNode.path}
      style={{ paddingLeft: `${treeNode.level * 20}px` }} // 20px per level
    >
      {treeNode.name}
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
