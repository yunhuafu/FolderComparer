import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
import { Stack } from '@mui/material'
import NavigationBar from './components/navigationBar/NavigationBar'
import TreeView from './components/treeView/TreeView'
import TitleBar from './components/titleBar/TitleBar'

function App(): React.JSX.Element {
  return (
    <Stack className="app" style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleBar />
      <Stack style={{ flex: '1 1 auto', display: 'flex', flexDirection: 'row' }}>
        <NavigationBar />
        <PanelGroup direction="horizontal" className="fullSize">
          <Panel defaultSize={30} minSize={30} className="fullSize">
            <TreeView />
          </Panel>
          <PanelResizeHandle />
          <Panel defaultSize={30} minSize={20} className="fullSize">
            <TreeView />
          </Panel>
        </PanelGroup>
      </Stack>
    </Stack>
  )
}

export default App
