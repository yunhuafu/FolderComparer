import './TreeViewAfterFolderSelection.css'
import { CustomComponentProps } from '../CustomComponent.types'
import { Box } from '@mui/material'
import { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { selectFileSystemNode1 } from '@renderer/app/fileSystemNode1Slice'
import { selectFileSystemNode2 } from '@renderer/app/fileSystemNode2Slice'
import { FileSystemNode } from 'src/models/FileSystemNode'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp'
import FolderIcon from '@mui/icons-material/Folder'
import { yellow } from '@mui/material/colors'

type TreeViewProps = CustomComponentProps & {
  isLeft: boolean
}

type FileSystemViewNode = {
  name: string
  parentPath: string
  fullPath: string
  hash: string
  isDirectory: boolean
  groupedChildren: FileSystemViewNode[][]
}

function getFileSystemViewNode(fileSystemNode: FileSystemNode): FileSystemViewNode {
  if (fileSystemNode.isDirectory == false) {
    return {
      name: fileSystemNode.name,
      parentPath: fileSystemNode.parentPath,
      fullPath: fileSystemNode.fullPath,
      hash: fileSystemNode.hash,
      isDirectory: fileSystemNode.isDirectory,
      groupedChildren: []
    }
  } else {
    const displayedHashIndexMap: Map<string, number> = new Map<string, number>()
    const groupedChildren: FileSystemViewNode[][] = []
    fileSystemNode.children.forEach((f) => {
      if (f.isDirectory) {
        groupedChildren.push([getFileSystemViewNode(f)])
      } else {
        const index = displayedHashIndexMap.get(f.hash)
        if (index == undefined) {
          groupedChildren.push([getFileSystemViewNode(f)])
          displayedHashIndexMap.set(f.hash, groupedChildren.length - 1)
        } else {
          groupedChildren[index].push(getFileSystemViewNode(f))
        }
      }
    })
    return {
      name: fileSystemNode.name,
      parentPath: fileSystemNode.parentPath,
      fullPath: fileSystemNode.fullPath,
      hash: fileSystemNode.hash,
      isDirectory: fileSystemNode.isDirectory,
      groupedChildren: groupedChildren
    }
  }
}

const groupBackgroundColors: string[] = ['#D6F0FF', '#DFFFE0', '#FFEACF'] // Sky Blue, Mint Green,Pale Orange

function getTreeNode(
  fileSystemViewNode: FileSystemViewNode,
  level: number,
  groupBackgroundColor: string = 'white'
): React.JSX.Element {
  if (fileSystemViewNode.isDirectory == false) {
    return (
      <div
        key={fileSystemViewNode.fullPath}
        style={{
          backgroundColor: `${groupBackgroundColor}`,
          border: '1px solid white ',
          borderRadius: '8px',
          paddingLeft: `${level * 20 + 20}px`,
          display: 'flex',
          alignItems: 'center'
        }} // 20px per level, 20px more because it is a file
      >
        <InsertDriveFileIcon sx={{ color: '#4da6ff' }}></InsertDriveFileIcon>
        <span>{fileSystemViewNode.name}</span>
      </div>
    )
  } else {
    let numberOfGroupsWithDuplicatedFiles: number = 0
    return (
      <div>
        <div
          key={fileSystemViewNode.fullPath}
          style={{
            border: '1px solid white ',
            borderRadius: '8px',
            paddingLeft: `${level * 20}px`,
            display: 'flex',
            alignItems: 'center'
          }} // 20px per level
        >
          <KeyboardArrowDownSharpIcon />
          <FolderIcon sx={{ color: yellow[500] }}></FolderIcon>
          <span>{fileSystemViewNode?.name}</span>
        </div>
        {fileSystemViewNode.groupedChildren.map((group, index) => {
          let groupBackgroundColor = 'white'
          if (group.length > 1) {
            groupBackgroundColor =
              groupBackgroundColors[
                numberOfGroupsWithDuplicatedFiles % groupBackgroundColors.length
              ]
            numberOfGroupsWithDuplicatedFiles++
          }
          return (
            <div key={group[0].fullPath + ' - group'}>
              {group.map((f) => {
                return getTreeNode(f, level + 1, groupBackgroundColor)
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

const TreeView = forwardRef<HTMLDivElement, TreeViewProps>(({ isLeft, ...rest }, ref) => {
  const fileSystemNode1 = useSelector(selectFileSystemNode1)
  const fileSystemNode2 = useSelector(selectFileSystemNode2)

  const fileSystemNode = isLeft ? fileSystemNode1 : fileSystemNode2

  if (fileSystemNode == null) {
    return (
      <Box ref={ref} {...rest}>
        <div className="treeViewAfterSelectionContainer"></div>
      </Box>
    )
  } else {
    const fileSystemViewNode = getFileSystemViewNode(fileSystemNode)
    return (
      <Box ref={ref} {...rest}>
        <div className="treeViewAfterSelectionContainer">{getTreeNode(fileSystemViewNode, 0)}</div>
      </Box>
    )
  }
})

TreeView.displayName = 'TreeViewAfterSelection'

export default TreeView
