import React from 'react';
import logo from './logo.svg';
import './App.css';
import TreeView from './components/treeview/TreeView';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

function App() {
  return (
    <div className="App">
      <PanelGroup direction="horizontal">
        <Panel minSize={20}>
          collapse
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
