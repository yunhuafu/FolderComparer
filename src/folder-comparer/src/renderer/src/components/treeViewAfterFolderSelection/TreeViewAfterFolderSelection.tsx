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
  hasDuplicates: boolean
}

function getFileSystemViewNode(fileSystemNode: FileSystemNode): FileSystemViewNode {
  if (fileSystemNode.isDirectory == false) {
    return {
      name: fileSystemNode.name,
      parentPath: fileSystemNode.parentPath,
      fullPath: fileSystemNode.fullPath,
      hash: fileSystemNode.hash,
      isDirectory: fileSystemNode.isDirectory,
      groupedChildren: [],
      hasDuplicates: false
    }
  } else {
    let hasDuplicates: boolean = false
    const displayedHashIndexMap: Map<string, number> = new Map<string, number>()
    const groupedChildren: FileSystemViewNode[][] = []
    fileSystemNode.children.forEach((f) => {
      if (f.isDirectory) {
        const fvn = getFileSystemViewNode(f)
        groupedChildren.push([fvn])
        if (fvn.hasDuplicates) hasDuplicates = true
      } else {
        const index = displayedHashIndexMap.get(f.hash)
        if (index == undefined) {
          groupedChildren.push([getFileSystemViewNode(f)])
          displayedHashIndexMap.set(f.hash, groupedChildren.length - 1)
        } else {
          groupedChildren[index].push(getFileSystemViewNode(f))
          hasDuplicates = true
        }
      }
    })
    return {
      name: fileSystemNode.name,
      parentPath: fileSystemNode.parentPath,
      fullPath: fileSystemNode.fullPath,
      hash: fileSystemNode.hash,
      isDirectory: fileSystemNode.isDirectory,
      groupedChildren: groupedChildren,
      hasDuplicates: hasDuplicates
    }
  }
}

const groupBackgroundColors: string[] = ['#D6F0FF', '#DFFFE0', '#FFEACF'] // Sky Blue, Mint Green,Pale Orange

function getTreeNode(
  fileSystemViewNode: FileSystemViewNode,
  level: number,
  groupBackgroundColor: string = 'white'
): React.JSX.Element {
  function getSafeId(input: string): string {
    // Replace all characters except letters, digits, underscores, and hyphens with "_"
    return input.replace(/[^\w-]/g, '_')
  }

  function handleCollapse(
    event: React.MouseEvent<SVGElement, MouseEvent>,
    fileSystemViewNode: FileSystemViewNode
  ): void {
    const safeId = getSafeId(fileSystemViewNode.fullPath)
    const element = document.getElementById(safeId + 'Children')
    if (element != null) element.style.display = 'none'
    const toggle = document.getElementById(safeId + 'Collapsed')
    if (toggle != null) toggle.style.display = 'block'
    event.currentTarget.style.display = 'none'
  }

  function handleExpand(
    event: React.MouseEvent<SVGElement, MouseEvent>,
    fileSystemViewNode: FileSystemViewNode
  ): void {
    const safeId = getSafeId(fileSystemViewNode.fullPath)
    const element = document.getElementById(safeId + 'Children')
    if (element != null) element.style.display = 'block'
    const eventElement = document.getElementById(safeId + 'Expanded')
    if (eventElement != null) eventElement.style.display = 'block'
    event.currentTarget.style.display = 'none'
  }

  if (fileSystemViewNode.isDirectory == false) {
    return (
      <div
        key={getSafeId(fileSystemViewNode.fullPath)}
        style={{
          backgroundColor: `${groupBackgroundColor}`,
          border: '1px solid white ',
          borderRadius: '8px',
          paddingLeft: `${level * 20 + 20}px`, // 20px per level, 20px more because it is a file
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <InsertDriveFileIcon sx={{ color: '#4da6ff' }}></InsertDriveFileIcon>
        <span>{fileSystemViewNode.name}</span>
      </div>
    )
  } else {
    let numberOfGroupsWithDuplicatedFiles: number = 0
    return (
      <div key={getSafeId(fileSystemViewNode.fullPath)}>
        <div
          style={{
            border: '1px solid white ',
            borderRadius: '8px',
            paddingLeft: `${level * 20}px`,
            display: 'flex',
            alignItems: 'center'
          }} // 20px per level
        >
          <KeyboardArrowDownSharpIcon
            id={getSafeId(fileSystemViewNode.fullPath + 'Expanded')}
            onClick={(event) => handleCollapse(event, fileSystemViewNode)}
          />
          <KeyboardArrowRightSharpIcon
            id={getSafeId(fileSystemViewNode.fullPath + 'Collapsed')}
            onClick={(event) => handleExpand(event, fileSystemViewNode)}
            style={{ display: 'none' }}
          />
          <FolderIcon sx={{ color: yellow[500] }}></FolderIcon>
          {fileSystemViewNode.hasDuplicates ? (
            <span style={{ color: 'red', fontWeight: 'bold' }}>{fileSystemViewNode.name}</span>
          ) : (
            <span>{fileSystemViewNode.name}</span>
          )}
        </div>
        <div id={getSafeId(fileSystemViewNode.fullPath + 'Children')}>
          {fileSystemViewNode.groupedChildren.map((group) => {
            let groupBackgroundColor = 'white'
            if (group.length > 1) {
              groupBackgroundColor =
                groupBackgroundColors[
                  numberOfGroupsWithDuplicatedFiles % groupBackgroundColors.length
                ]
              numberOfGroupsWithDuplicatedFiles++
            }
            return (
              <div key={getSafeId(group[0].fullPath + 'Group')}>
                {group.map((f) => {
                  return getTreeNode(f, level + 1, groupBackgroundColor)
                })}
              </div>
            )
          })}
        </div>
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
