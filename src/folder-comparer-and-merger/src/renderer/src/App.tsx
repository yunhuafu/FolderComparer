import NavigationBar from './components/navigationBar/NavigationBar'
import TreeView from './components/treeView/TreeView'
import TitleBar from './components/titleBar/TitleBar'
import InformationBar from './components/informationBar/InformationBar'

function App(): React.JSX.Element {
  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleBar style={{ padding: '5px' }} />
      <div
        style={{
          flex: '1 1 auto',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'row',
          padding: '5px'
        }}
      >
        <NavigationBar />
        <TreeView style={{ flex: '1 1 auto', overflow: 'auto' }}></TreeView>
        <TreeView style={{ flex: '1 1 auto', overflow: 'auto' }}></TreeView>
      </div>
      <InformationBar style={{ padding: '5px' }} />
    </div>
  )
}

export default App
