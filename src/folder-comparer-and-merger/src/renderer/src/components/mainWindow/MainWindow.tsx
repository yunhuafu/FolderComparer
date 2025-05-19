import { Box } from '@mui/material'
import { CustomComponentProps } from '../CustomComponent.types'
import TreeView from '../treeView/TreeView'
import { useRef } from 'react'
import { useScrollSync } from '@renderer/hooks/useScrollSync'
import { useSelector } from 'react-redux'
import { Mode, selectMode } from '@renderer/app/modeSlice'
import TreeViewAfterFolderSelection from '../treeViewAfterFolderSelection/TreeViewAfterFolderSelection'

function MainWindow({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  let enableScrollSync = false

  const mode = useSelector(selectMode)
  let TreeViewComponent = TreeViewAfterFolderSelection
  switch (mode) {
    case Mode.AFTER_FOLDER_SELECTION:
      TreeViewComponent = TreeViewAfterFolderSelection
      enableScrollSync = false
      break
    case Mode.AFTER_COMPARISON:
      TreeViewComponent = TreeView
      enableScrollSync = true
      break
  }

  const divRef1 = useRef<HTMLDivElement>(null)
  const divRef2 = useRef<HTMLDivElement>(null)
  useScrollSync(divRef1, divRef2, enableScrollSync)
  return (
    <Box sx={sx} className={className} style={style}>
      <TreeViewComponent
        ref={divRef1}
        isLeft={true}
        style={{ flex: '1 1 auto', overflow: 'auto' }}
      ></TreeViewComponent>
      <TreeViewComponent
        ref={divRef2}
        isLeft={false}
        style={{ flex: '1 1 auto', overflow: 'auto' }}
      ></TreeViewComponent>
    </Box>
  )
}

export default MainWindow
