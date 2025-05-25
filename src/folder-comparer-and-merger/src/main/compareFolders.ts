import { Dirent, promises as fs } from 'fs'
import path from 'path'
import { FileSystemItem, ComparisonResultType, ComparisonResult } from '../models/ComparisonResult'

async function isDirectory(fullPath: string): Promise<boolean | null> {
  try {
    const stats = await fs.stat(fullPath)
    if (stats.isFile()) return false
    if (stats.isDirectory()) return true
    return null
  } catch (err) {
    console.log('err when accessing ' + fullPath + ': ' + err)
    return null
  }
}

async function compareFileSystemItems(
  leftFileSystemItem: FileSystemItem | null,
  rightFileSystemItem: FileSystemItem | null
): Promise<ComparisonResult> {
  if (leftFileSystemItem == null && rightFileSystemItem == null) {
    return new ComparisonResult(null, null, ComparisonResultType.SAME, null)
  } else if (leftFileSystemItem == null && rightFileSystemItem != null) {
    if (rightFileSystemItem?.isDirectory == false) {
      return new ComparisonResult(
        leftFileSystemItem,
        rightFileSystemItem,
        ComparisonResultType.RIGHT_ONLY,
        null
      )
    } else {
      const comparisonResult: ComparisonResult = new ComparisonResult(
        leftFileSystemItem,
        rightFileSystemItem,
        ComparisonResultType.RIGHT_ONLY,
        []
      )
      const entries: Dirent[] = await fs.readdir(
        path.join(rightFileSystemItem?.parentPath, rightFileSystemItem?.name),
        { withFileTypes: true }
      )
      for (const entry of entries) {
        comparisonResult.children?.push(
          await compareFileSystemItems(null, FileSystemItem.fromDirent(entry))
        )
      }
      return comparisonResult
    }
  } else if (leftFileSystemItem != null && rightFileSystemItem == null) {
    if (leftFileSystemItem?.isDirectory == false) {
      return new ComparisonResult(
        leftFileSystemItem,
        rightFileSystemItem,
        ComparisonResultType.LEFT_ONLY,
        null
      )
    } else {
      const comparisonResult: ComparisonResult = new ComparisonResult(
        leftFileSystemItem,
        rightFileSystemItem,
        ComparisonResultType.LEFT_ONLY,
        []
      )
      const entries: Dirent[] = await fs.readdir(
        path.join(leftFileSystemItem?.parentPath, leftFileSystemItem?.name),
        { withFileTypes: true }
      )
      for (const entry of entries) {
        comparisonResult.children?.push(
          await compareFileSystemItems(FileSystemItem.fromDirent(entry), null)
        )
      }
      return comparisonResult
    }
  } else {
    // both file
    if (leftFileSystemItem.isDirectory == false && rightFileSystemItem.isDirectory == false) {
      // if the content is the same
      const buf1 = await fs.readFile(
        path.join(leftFileSystemItem.parentPath, leftFileSystemItem.name)
      )
      const buf2 = await fs.readFile(
        path.join(rightFileSystemItem.parentPath, rightFileSystemItem.name)
      )
      if (buf1.equals(buf2)) {
        return new ComparisonResult(
          leftFileSystemItem,
          rightFileSystemItem,
          ComparisonResultType.SAME,
          null
        )
      } else {
        return new ComparisonResult(
          leftFileSystemItem,
          rightFileSystemItem,
          ComparisonResultType.DIFFERENT,
          null
        )
      }
    }
    // one file one folder (tbd)
    // both directories (the first directories compared have different names, but the recursive directories compared will have same names)
    else {
      const comparisonResult: ComparisonResult = new ComparisonResult(
        leftFileSystemItem,
        rightFileSystemItem,
        ComparisonResultType.SAME,
        []
      )
      const entries1: Dirent[] = await fs.readdir(
        path.join(leftFileSystemItem.parentPath, leftFileSystemItem.name),
        { withFileTypes: true }
      )
      const entries2: Dirent[] = await fs.readdir(
        path.join(rightFileSystemItem.parentPath, rightFileSystemItem.name),
        { withFileTypes: true }
      )
      const entryMap1 = new Map<string, Dirent>(entries1.map((e) => [e.name, e]))
      const entryMap2 = new Map<string, Dirent>(entries2.map((e) => [e.name, e]))
      const keys = new Set([...entryMap1.keys(), ...entryMap2.keys()])

      // !!! forEach(async ...) doesn’t Await
      for (const key of keys) {
        const entry1 = entryMap1.get(key)
        const entry2 = entryMap2.get(key)
        const child: ComparisonResult = await compareFileSystemItems(
          entry1 ? FileSystemItem.fromDirent(entry1) : null,
          entry2 ? FileSystemItem.fromDirent(entry2) : null
        )
        if (child.comparisonResultType != ComparisonResultType.SAME)
          comparisonResult.comparisonResultType = ComparisonResultType.DIFFERENT
        comparisonResult.children?.push(child)
      }
      return comparisonResult
    }
  }
}

async function compareFolders(
  folderPath1: string,
  folderPath2: string
): Promise<ComparisonResult | null> {
  const leftFileSystemItemIsDirectory = await isDirectory(folderPath1)
  const rightFileSystemItemIsDirectory = await isDirectory(folderPath2)
  if (leftFileSystemItemIsDirectory == null || rightFileSystemItemIsDirectory == null) {
    console.log('invalid folder paths')
    return null
  }

  const leftFileSystemItem: FileSystemItem = new FileSystemItem(
    path.basename(folderPath1),
    path.dirname(folderPath1),
    leftFileSystemItemIsDirectory
  )
  const rightFileSystemItem: FileSystemItem = new FileSystemItem(
    path.basename(folderPath2),
    path.dirname(folderPath2),
    rightFileSystemItemIsDirectory
  )

  const comparisonResult: ComparisonResult = await compareFileSystemItems(
    leftFileSystemItem,
    rightFileSystemItem
  )
  return comparisonResult
}

export default compareFolders
