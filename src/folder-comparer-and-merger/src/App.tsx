import React from 'react';
import logo from './logo.svg';
import './App.css';
import TreeView from './components/treeview/TreeView';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';

function App() {
  return (
    <div className="App">
      <PanelGroup direction="horizontal">
        <Panel minSize={30} maxSize={30}>
          <KeyboardArrowRightSharpIcon/> 
          <KeyboardArrowDownSharpIcon/> 
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={30} minSize={30} className='panel-treeview'>
          <TreeView/>
        </Panel>
        <PanelResizeHandle />
        <Panel defaultSize={30} minSize={20} className='panel-treeview'>
          <TreeView/>
        </Panel>
      </PanelGroup>
    </div>
  );
}

export default App;
