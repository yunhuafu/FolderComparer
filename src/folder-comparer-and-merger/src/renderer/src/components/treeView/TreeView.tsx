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
import ComparisonResult from 'src/models/ComparisonResult'
import TraverseResultItem from 'src/models/TraverseResultItem'

function traverse(
  comparisonResult: ComparisonResult | null,
  traverseResult: TraverseResultItem[],
  level: number
): void {
  comparisonResult?.sameEntries.forEach((comparisonResultItem) => {
    const item: TraverseResultItem = new TraverseResultItem(
      comparisonResultItem[0],
      comparisonResultItem[1],
      level
    )
    traverseResult.push(item)
    if (comparisonResultItem[0].isDirectory)
      traverse(comparisonResultItem[2], traverseResult, level + 1)
  })
}

const TreeView = forwardRef<HTMLDivElement, CustomComponentProps>((props, ref) => {
  const comparisonResult = useSelector(selectComparisonResult)
  const traverseResult: TraverseResultItem[] = []
  traverse(comparisonResult, traverseResult, 0)

  const treeNodes = traverseResult.map((treeNode) => (
    <li
      key={treeNode.entry1?.name}
      style={{ paddingLeft: `${treeNode.level * 20}px` }} // 20px per level
    >
      {treeNode.entry1?.isDirectory && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <KeyboardArrowDownSharpIcon />
          <FolderIcon sx={{ color: yellow[500] }}></FolderIcon>
          <span>{treeNode.entry1?.name}</span>
        </div>
      )}
      {!treeNode.entry1?.isDirectory && (
        <div style={{ paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
          <InsertDriveFileIcon sx={{ color: blue[500] }}></InsertDriveFileIcon>
          <span>{treeNode.entry1?.name}</span>
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
