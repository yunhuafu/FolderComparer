import React from 'react';
import logo from './logo.svg';
import './App.css';
import TreeView from './components/treeview/TreeView';
import NavigationBar from './components/navigationbar/NavigationBar';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Stack } from '@mui/material';
import TitleBar from './components/titlebar/TitleBar';

function App() {
  return (
    <div className="App">
      <Stack>
        <TitleBar/>
        <Stack direction = "row">
          <NavigationBar/>
          <PanelGroup direction="horizontal">
            <Panel defaultSize={30} minSize={30} className='panel-treeview'>
              <TreeView/>
            </Panel>
            <PanelResizeHandle />
            <Panel defaultSize={30} minSize={20} className='panel-treeview'>
              <TreeView/>
            </Panel>
          </PanelGroup>
          </Stack>            
        </Stack>
    </div>
  );
}

export default App;
