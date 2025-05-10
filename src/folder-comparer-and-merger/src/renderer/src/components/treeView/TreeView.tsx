import './TreeView.css'
import { useSelector } from 'react-redux'
import { selectComparisonResult } from '@renderer/app/comparisonResultSlice'
import { CustomComponentProps } from '../CustomComponent.types'
import { Box } from '@mui/material'

function TreeView({ sx, className, style }: CustomComponentProps): React.JSX.Element {
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
    <Box sx={sx} className={className} style={style}>
      <div className="treeViewContainer">
        <ul>{treeNodes}</ul>
      </div>
    </Box>
  )
}

export default TreeView
