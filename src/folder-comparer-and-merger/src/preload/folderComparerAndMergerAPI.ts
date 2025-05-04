const FolderComparerAndMergerAPI = {
  selectFolder: () => Promise<string | null>,
  compareFolders: (folderPath1: string, folderPath2: string) => Promise<object[] | null>
}

export default FolderComparerAndMergerAPI
