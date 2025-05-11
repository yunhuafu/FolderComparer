import File from '../models/File'
import Folder from '../models/Folder'
import { promises as fs } from 'fs'
import path from 'path'
import TraverseResultItem from '../models/TraverseResultItem'

class FolderComparer {
  private static async getFolder(folderPath: string): Promise<Folder | null> {
    try {
      console.log('folderPath: ' + folderPath)
      const entries = await fs.readdir(folderPath, { withFileTypes: true })

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

  public static traverse(folder: Folder, result: object[], level: number): void {
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

  public static async compareFolders(
    folderPath1: string,
    folderPath2: string
  ): Promise<object[] | null> {
    console.log('folderPath: ' + folderPath1)
    const folder1 = await FolderComparer.getFolder(folderPath1)
    if (folder1 == null) return null
    const folder2 = await FolderComparer.getFolder(folderPath2)
    if (folder2 == null) return null
    const result = []
    FolderComparer.traverse(folder1, result, 0)
    return result
  }
}

export default FolderComparer
