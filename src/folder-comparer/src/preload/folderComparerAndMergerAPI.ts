import { ComparisonResult } from '../models/ComparisonResult'
import { FileSystemNode } from '../models/FileSystemNode'

const FolderComparerAPI = {
  selectFolder: () => Promise<FileSystemNode | null>,
  compareFolders: (folderPath1: string, folderPath2: string) => Promise<ComparisonResult | null>
}

export default FolderComparerAPI
