import { ComparisonResult } from "../models/ComparisonResult"

const FolderComparerAndMergerAPI = {
  selectFolder: () => Promise<string | null>,
  compareFolders: (folderPath1: string, folderPath2: string) => Promise<ComparisonResult>
}

export default FolderComparerAndMergerAPI
