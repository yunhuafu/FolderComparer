import File from '../models/File'
import Folder from '../models/Folder'
import { Dirent, promises as fs } from 'fs'
import path from 'path'
import TraverseResultItem from '../models/TraverseResultItem'
import ComparisonResult, { DirentForIPC } from '../models/ComparisonResult'

class FolderComparer {
  private static async getFolder(folderPath: string): Promise<Folder | null> {
    try {
      console.log('folderPath: ' + folderPath)
      const entries = await fs.readdir(folderPath, { withFileTypes: true })
      entries.sort((a, b) => a.name.localeCompare(b.name))

      const folder = new Folder()
      folder.name = path.basename(folderPath)
      folder.path = folderPath
      for (const entry of entries) {
        if (entry.isFile()) {
          const fullPath = path.join(folderPath, entry.name)
          const stats = await fs.stat(fullPath)
          const file = new File()
          file.name = entry.name
          file.path = fullPath
          file.size = stats.size
          folder.files.push(file)
        } else if (entry.isDirectory()) {
          const fullPath = path.join(folderPath, entry.name)
          const subfolder = await this.getFolder(fullPath)
          subfolder && folder.folders.push(subfolder)
        }
      }
      return folder
    } catch (err) {
      console.error('Error reading folder:', err)
      //throw err;
      return null
    }
  }

  public static traverse(folder: Folder, result: TraverseResultItem[], level: number): void {
    const folderItem: TraverseResultItem = { ...folder, type: '', isFolder: true, level: level }
    result.push(folderItem)

    folder.folders.forEach((f) => {
      FolderComparer.traverse(f, result, level + 1)
    })

    folder.files.forEach((file) => {
      const fileItem: TraverseResultItem = { ...file, isFolder: false, level: level + 1 }
      result.push(fileItem)
    })
  }

  // public static async compareFolders(
  //   folderPath1: string,
  //   folderPath2: string
  // ): Promise<object[] | null> {
  //   console.log('folderPath: ' + folderPath1)
  //   const folder1 = await FolderComparer.getFolder(folderPath1)
  //   if (folder1 == null) return null
  //   const folder2 = await FolderComparer.getFolder(folderPath2)
  //   if (folder2 == null) return null
  //   const traverseResult1 = []
  //   FolderComparer.traverse(folder1, traverseResult1, 0)
  //   const traverseResult2 = []
  //   FolderComparer.traverse(folder2, traverseResult2, 0)
  //   return traverseResult1
  // }

  public static async compareFolders(
    folderPath1: string,
    folderPath2: string
  ): Promise<ComparisonResult> {
    const comparisonResult: ComparisonResult = new ComparisonResult()

    let entries1: Dirent[] = []
    if (folderPath1 != null && folderPath1 != '')
      entries1 = await fs.readdir(folderPath1, { withFileTypes: true })

    let entries2: Dirent[] = []
    if (folderPath2 != null && folderPath2 != '')
      entries2 = await fs.readdir(folderPath2, { withFileTypes: true })

    const entryMap1 = new Map<string, Dirent>(entries1.map((e) => [e.name, e]))
    const entryMap2 = new Map<string, Dirent>(entries2.map((e) => [e.name, e]))

    const keys = new Set([...entryMap1.keys(), ...entryMap2.keys()])

    // !!! forEach(async ...) doesn’t Await
    for (const key of keys) {
      const entry1 = entryMap1.get(key)
      const entry2 = entryMap2.get(key)
      // left only
      if (entry1 != null && entry2 == null) {
        comparisonResult.isIdentical = false
        if (entry1.isDirectory()) {
          const subFolderComparisonResult: ComparisonResult = await FolderComparer.compareFolders(
            path.join(entry1.parentPath, entry1.name),
            ''
          )
          comparisonResult.leftOnlyEntries.push([
            new DirentForIPC(entry1),
            null,
            subFolderComparisonResult
          ])
        } else comparisonResult.leftOnlyEntries.push([new DirentForIPC(entry1), null, null])
      }
      // right only
      else if (entry1 == null && entry2 != null) {
        comparisonResult.isIdentical = false
        if (entry2.isDirectory()) {
          const subFolderComparisonResult: ComparisonResult = await FolderComparer.compareFolders(
            '',
            path.join(entry2.parentPath, entry2.name)
          )
          comparisonResult.rightOnlyEntries.push([
            null,
            new DirentForIPC(entry2),
            subFolderComparisonResult
          ])
        } else comparisonResult.rightOnlyEntries.push([null, new DirentForIPC(entry2), null])
      } else if (entry1 && entry2) {
        // same name
        if (entry1?.name == entry2?.name) {
          // if we are comparing folders
          if (entry1 && entry2 && entry1.isDirectory() && entry2.isDirectory()) {
            const subFolderComparisonResult: ComparisonResult = await FolderComparer.compareFolders(
              path.join(entry1.parentPath, entry1.name),
              path.join(entry2.parentPath, entry2.name)
            )
            if (subFolderComparisonResult.isIdentical == false) {
              comparisonResult.isIdentical = false
              comparisonResult.differentEntries.push([
                new DirentForIPC(entry1),
                new DirentForIPC(entry2),
                subFolderComparisonResult
              ])
            } else {
              comparisonResult.sameEntries.push([
                new DirentForIPC(entry1),
                new DirentForIPC(entry2),
                subFolderComparisonResult
              ])
            }
          }
          // if we are comparing file and folder or folder and file
          else if (entry1 && entry2 && (entry1.isDirectory() || entry2.isDirectory())) {
            // tbd
          }
          // if we are comparing files
          else {
            // if the content is the same
            comparisonResult.sameEntries.push([
              new DirentForIPC(entry1),
              new DirentForIPC(entry2),
              null
            ])
            // tdb
            // else
            // comparisonResult.differentEntries.push([entry1, entry2])
          }
        } else {
          // shall not be able to reach here, names are either left only, right only, or the same
        }
      }
    }
    return comparisonResult
  }
}

export default FolderComparer
