import { DirentForIPC } from './ComparisonResult'

class TraverseResultItem {
  constructor(
    public entry1: DirentForIPC | null,
    public entry2: DirentForIPC | null,
    public level: number
  ) {}
}

export default TraverseResultItem
