import './TreeView.css'
import { useSelector } from 'react-redux'
import { selectComparisonResult } from '@renderer/app/comparisonResultSlice'

function TreeView(): React.JSX.Element {
  const comparisonResult = useSelector(selectComparisonResult)
  const treeNodes = comparisonResult.map((treeNode) => (
    <li
      key={treeNode.path}
      style={{ paddingLeft: `${treeNode.level * 20}px` }} // 20px per level
    >
      {treeNode.name}
    </li>
  ))

  return (
    <div className="treeViewContainer" style={{ width: '100%', height: '100%' }}>
      <ul>{treeNodes}</ul>
    </div>
  )
}

export default TreeView
