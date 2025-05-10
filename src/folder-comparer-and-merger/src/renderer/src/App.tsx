import TitleBar from './components/titleBar/TitleBar'
import InformationBar from './components/informationBar/InformationBar'
import MainWindow from './components/mainWindow/MainWindow'

function App(): React.JSX.Element {
  return (
    <div className="app" style={{ display: 'flex', flexDirection: 'column' }}>
      <TitleBar style={{ padding: '5px' }} />
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
  )
}

export default App
