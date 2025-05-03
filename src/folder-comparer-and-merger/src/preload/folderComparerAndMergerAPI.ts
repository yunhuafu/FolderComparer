import Folder from '../models/Folder'

const FolderComparerAndMergerAPI = {
  selectFolder: () => Promise<string | null>,
  compareFolders: (folderPath1: string, folderPath2: string) =>
    Promise<[Folder | null, Folder | null]>
}

export default FolderComparerAndMergerAPI
