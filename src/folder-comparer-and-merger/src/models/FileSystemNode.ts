type FileSystemNode = {
  name: string
  parentPath: string
  fullPath: string
  hash: string
  isDirectory: boolean
  children: FileSystemNode[]
}

export type { FileSystemNode }
