import { FileSystemItem, ComparisonResultType } from './ComparisonResult'

class TraverseResultItem {
  constructor(
    public leftFileSystemItem: FileSystemItem | null,
    public rightFileSystemItem: FileSystemItem | null,
    public comparisonResultType: ComparisonResultType,
    public level: number
  ) {}
}

export default TraverseResultItem
