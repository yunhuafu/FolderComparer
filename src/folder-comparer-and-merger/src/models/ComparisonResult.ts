import { Dirent } from 'fs'

// Dirent passed to render process will lose methods due to structure copy only
// Dirent is not directly constructible — you can't extend or instantiate it directly because it’s implemented in native code inside Node.js.
class DirentForIPC {
  name: string
  parentPath: string
  isDirectory: boolean
  constructor(dirent: Dirent) {
    this.name = dirent.name
    this.parentPath = dirent.parentPath
    this.isDirectory = dirent.isDirectory()
  }
}

// each entry [ dirent1, dirent2, comparisonResult]
class ComparisonResult {
  isIdentical: boolean = true
  sameEntries: [DirentForIPC, DirentForIPC, ComparisonResult | null][] = []
  differentEntries: [DirentForIPC, DirentForIPC, ComparisonResult | null][] = []
  leftOnlyEntries: [DirentForIPC, null, ComparisonResult | null][] = []
  rightOnlyEntries: [null, DirentForIPC, ComparisonResult | null][] = []
}

export { DirentForIPC }
export default ComparisonResult
