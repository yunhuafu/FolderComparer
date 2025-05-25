import * as fs from 'fs/promises'
import * as path from 'path'
import * as crypto from 'crypto'
import { FileSystemNode } from '../models/FileSystemNode'

async function getFileHash(filePath: string): Promise<string> {
  const fileData = await fs.readFile(filePath)
  const hash = crypto.createHash('sha256')
  hash.update(fileData)
  return hash.digest('hex')
}

async function getFileSystemNode(fullPath: string): Promise<FileSystemNode> {
  const stat = await fs.stat(fullPath)
  const name = path.basename(fullPath)
  const parentPath = path.dirname(fullPath)
  const isDirectory = stat.isDirectory()

  let hash = ''
  const children: FileSystemNode[] = []
  if (isDirectory) {
    const entries = await fs.readdir(fullPath, { withFileTypes: true })
    for (const entry of entries) {
      const childFullPath = path.join(entry.parentPath, entry.name)
      const child = await getFileSystemNode(childFullPath)
      children.push(child)
    }
  } else {
    hash = await getFileHash(fullPath)
  }

  return {
    name,
    parentPath,
    fullPath,
    hash,
    isDirectory,
    children
  }
}

export default getFileSystemNode
