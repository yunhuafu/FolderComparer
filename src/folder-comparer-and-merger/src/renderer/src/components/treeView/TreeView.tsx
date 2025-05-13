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
import TraverseResultItem, { ComparisonType } from 'src/models/TraverseResultItem'

function traverse(
  comparisonResult: ComparisonResult | null,
  traverseResult: TraverseResultItem[],
  level: number
): void {
  comparisonResult?.sameEntries.forEach((comparisonResultItem) => {
    const item: TraverseResultItem = new TraverseResultItem(
      comparisonResultItem[0],
      comparisonResultItem[1],
      level,
      ComparisonType.SAME
    )
    traverseResult.push(item)
    if (comparisonResultItem[0].isDirectory)
      traverse(comparisonResultItem[2], traverseResult, level + 1)
  })
  comparisonResult?.differentEntries.forEach((comparisonResultItem) => {
    const item: TraverseResultItem = new TraverseResultItem(
      comparisonResultItem[0],
      comparisonResultItem[1],
      level,
      ComparisonType.DIFFERENT
    )
    traverseResult.push(item)
    if (comparisonResultItem[0].isDirectory)
      traverse(comparisonResultItem[2], traverseResult, level + 1)
  })
  comparisonResult?.leftOnlyEntries.forEach((comparisonResultItem) => {
    const item: TraverseResultItem = new TraverseResultItem(
      comparisonResultItem[0],
      comparisonResultItem[1],
      level,
      ComparisonType.LEFT_ONLY
    )
    traverseResult.push(item)
    if (comparisonResultItem[0].isDirectory)
      traverse(comparisonResultItem[2], traverseResult, level + 1)
  })
  comparisonResult?.rightOnlyEntries.forEach((comparisonResultItem) => {
    const item: TraverseResultItem = new TraverseResultItem(
      comparisonResultItem[0],
      comparisonResultItem[1],
      level,
      ComparisonType.RIGHT_ONLY
    )
    traverseResult.push(item)
    if (comparisonResultItem[1].isDirectory)
      traverse(comparisonResultItem[2], traverseResult, level + 1)
  })
}

type TreeViewProps = CustomComponentProps & {
  isLeft: boolean
}

const TreeView = forwardRef<HTMLDivElement, TreeViewProps>((props, ref) => {
  const comparisonResult = useSelector(selectComparisonResult)
  const traverseResult: TraverseResultItem[] = []
  traverse(comparisonResult, traverseResult, 0)

  const treeNodes = traverseResult.map((traverseResultItem) => {
    let backgroundColor = 'White'
    switch (traverseResultItem.type) {
      case ComparisonType.SAME:
        backgroundColor = 'White'
        break
      case ComparisonType.DIFFERENT:
        backgroundColor = 'Moccasin'
        break
      case ComparisonType.LEFT_ONLY:
        if (props.isLeft == true) backgroundColor = 'Plum'
        break
      case ComparisonType.RIGHT_ONLY:
        if (props.isLeft == false) backgroundColor = 'Plum'
        break
    }

    let treeNode = traverseResultItem.entry1
    if (props.isLeft == false) treeNode = traverseResultItem.entry2

    if (treeNode) {
      return (
        <div
          key={treeNode?.name}
          style={{
            paddingLeft: `${traverseResultItem.level * 20}px`,
            backgroundColor: `${backgroundColor}`
          }} // 20px per level
        >
          {treeNode?.isDirectory && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <KeyboardArrowDownSharpIcon />
              <FolderIcon sx={{ color: yellow[500] }}></FolderIcon>
              <span>{treeNode?.name}</span>
            </div>
          )}
          {!treeNode?.isDirectory && (
            <div style={{ paddingLeft: '20px', display: 'flex', alignItems: 'center' }}>
              <InsertDriveFileIcon sx={{ color: blue[500] }}></InsertDriveFileIcon>
              <span>{treeNode?.name}</span>
            </div>
          )}
        </div>
      )
    } else {
      return (
        <div
          key={-1}
          style={{
            paddingLeft: `${traverseResultItem.level * 20}px`,
            backgroundColor: `${backgroundColor}`
          }} // 20px per level
        >
          <p>&nbsp;</p>
        </div>
      )
    }
  })

  return (
    <Box ref={ref} {...props}>
      <div className="treeViewContainer">{treeNodes}</div>
    </Box>
  )
})

TreeView.displayName = 'TreeView'

export default TreeView
