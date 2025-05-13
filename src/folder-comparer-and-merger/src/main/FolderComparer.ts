import { Dirent, promises as fs } from 'fs'
import path from 'path'
import ComparisonResult, { DirentForIPC } from '../models/ComparisonResult'

class FolderComparer {
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
            const buf1 = await fs.readFile(path.join(entry1.parentPath, entry1?.name))
            const buf2 = await fs.readFile(path.join(entry2.parentPath, entry2?.name))
            if (buf1.equals(buf2)) {
              comparisonResult.sameEntries.push([
                new DirentForIPC(entry1),
                new DirentForIPC(entry2),
                null
              ])
            } else {
              comparisonResult.isIdentical = false
              comparisonResult.differentEntries.push([
                new DirentForIPC(entry1),
                new DirentForIPC(entry2),
                null
              ])
            }
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
