import { DirentForIPC } from './ComparisonResult'

export const ComparisonType = Object.freeze({
  SAME: 'same',
  DIFFERENT: 'different',
  LEFT_ONLY: 'leftOnly',
  RIGHT_ONLY: 'rightOnly'
})

class TraverseResultItem {
  constructor(
    public entry1: DirentForIPC | null,
    public entry2: DirentForIPC | null,
    public level: number,
    public type: string
  ) {}
}

export default TraverseResultItem
