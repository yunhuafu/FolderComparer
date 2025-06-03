type FileSystemItem = {
  name: string
  parentPath: string
  fullPath: string
  isDirectory: boolean
}

class ComparisonResultType {
  static SAME: string = 'same'
  static DIFFERENT: string = 'different'
  static LEFT_ONLY: string = 'leftOnly'
  static RIGHT_ONLY: string = 'rightOnly'
}

type ComparisonResult = {
  leftFileSystemItem: FileSystemItem | null
  rightFileSystemItem: FileSystemItem | null
  comparisonResultType: ComparisonResultType
  children: ComparisonResult[] | null
}

export type { FileSystemItem, ComparisonResult }
export { ComparisonResultType }
