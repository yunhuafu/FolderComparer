import './TreeViewAfterFolderSelection.css'
import { CustomComponentProps } from '../CustomComponent.types'
import { Box } from '@mui/material'
import { forwardRef } from 'react'
import { useSelector } from 'react-redux'
import { selectFileSystemNode1 } from '@renderer/app/fileSystemNode1Slice'
import { selectFileSystemNode2 } from '@renderer/app/fileSystemNode2Slice'
import { FileSystemNode } from 'src/models/FileSystemNode'

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
        <div className="treeViewAfterSelectionContainer"></div>
      </Box>
    )
  }
})

TreeView.displayName = 'TreeViewAfterSelection'

export default TreeView
