import { Box } from '@mui/material'
import { CustomComponentProps } from '../CustomComponent.types'
import TreeView from '../treeView/TreeView'
import { useRef } from 'react'
import { useScrollSync } from '@renderer/hooks/useScrollSync'

function MainWindow({ sx, className, style }: CustomComponentProps): React.JSX.Element {
  const divRef1 = useRef<HTMLDivElement>(null)
  const divRef2 = useRef<HTMLDivElement>(null)

  useScrollSync(divRef1, divRef2)

  return (
    <Box sx={sx} className={className} style={style}>
      <TreeView
        ref={divRef1}
        isLeft={true}
        style={{ flex: '1 1 auto', overflow: 'auto' }}
      ></TreeView>
      <TreeView
        ref={divRef2}
        isLeft={false}
        style={{ flex: '1 1 auto', overflow: 'auto' }}
      ></TreeView>
    </Box>
  )
}

export default MainWindow
