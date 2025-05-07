import './TreeView.css'
import { useSelector } from 'react-redux'
import { selectComparisonResult } from '@renderer/app/comparisonResultSlice'

function TreeView(): React.JSX.Element {
  const comparisonResult = useSelector(selectComparisonResult)
  const treeNodes = comparisonResult.map((treeNode) => (
    <li key={treeNode.toString()}>{treeNode.toString()}</li>
  ))
  return (
    <div className="TreeView">
      <ul>{treeNodes}</ul>
    </div>
  )
}

export default TreeView
