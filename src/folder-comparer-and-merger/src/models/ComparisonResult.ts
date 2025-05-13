import { Dirent } from 'fs'

// each entry [ dirent1, dirent2, comparisonResult]
class ComparisonResult {
  isIdentical: boolean = true
  sameEntries: [Dirent, Dirent, ComparisonResult | null][] = []
  differentEntries: [Dirent, Dirent, ComparisonResult | null][] = []
  leftOnlyEntries: [Dirent, null, ComparisonResult | null][] = []
  rightOnlyEntries: [null, Dirent, ComparisonResult | null][] = []
}

export default ComparisonResult
