import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Stack } from '@mui/material';
import NavigationBar from './components/navigationBar/NavigationBar';
import TreeView from './components/treeView/TreeView';
import TitleBar from './components/titleBar/TitleBar';

function App(): React.JSX.Element {
  return (
    <div className="App">
      <Stack>
        <TitleBar />
        <Stack direction="row">
          <NavigationBar />
          <PanelGroup direction="horizontal">
            <Panel defaultSize={30} minSize={30} className="panel-treeview">
              <TreeView />
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={30} minSize={20} className="panel-treeview">
              <TreeView />
            </Panel>
          </PanelGroup>
        </Stack>
      </Stack>
    </div>
  )
}

export default App
