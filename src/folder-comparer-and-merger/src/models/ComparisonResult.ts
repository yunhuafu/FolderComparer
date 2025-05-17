import { Dirent } from 'fs'

class FileSystemItem {
  name: string
  parentPath: string
  isDirectory: boolean
  constructor(name: string, parentPath: string, isDirectory: boolean) {
    this.name = name
    this.parentPath = parentPath
    this.isDirectory = isDirectory
  }
  static fromDirent(dirent: Dirent): FileSystemItem {
    return new FileSystemItem(dirent.name, dirent.parentPath, dirent.isDirectory())
  }
}

class ComparisonResultType {
  static SAME: string = 'same'
  static DIFFERENT: string = 'different'
  static LEFT_ONLY: string = 'leftOnly'
  static RIGHT_ONLY: string = 'rightOnly'
}

class ComparisonResult {
  leftFileSystemItem: FileSystemItem | null = null
  rightFileSystemItem: FileSystemItem | null = null
  comparisonResultType: ComparisonResultType = ComparisonResultType.SAME
  children: ComparisonResult[] | null = []

  constructor(
    leftFileSystemItem: FileSystemItem | null,
    rightFileSystemItem: FileSystemItem | null,
    comparisonResultType: string,
    children: ComparisonResult[] | null
  ) {
    this.leftFileSystemItem = leftFileSystemItem
    this.rightFileSystemItem = rightFileSystemItem
    this.comparisonResultType = comparisonResultType
    this.children = children
  }
}

export { ComparisonResultType, FileSystemItem, ComparisonResult }
