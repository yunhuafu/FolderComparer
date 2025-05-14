import TitleBar from './components/titleBar/TitleBar'
import InformationBar from './components/informationBar/InformationBar'
import MainWindow from './components/mainWindow/MainWindow'
import NavigationBar from './components/navigationBar/NavigationBar'

function App(): React.JSX.Element {
  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'row' }}>
      <NavigationBar style={{ flex: '0 1 auto', display: 'flex', flexDirection: 'column', backgroundColor:'#e7e7e6' }} />
      <div style={{ flex: '1 1 auto', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        <TitleBar />
        <MainWindow
          style={{
            flex: '1 1 auto',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'row',
            padding: '5px'
          }}
        />
        <InformationBar style={{ padding: '5px' }} />
      </div>
    </div>
  )
}

export default App
