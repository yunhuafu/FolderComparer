import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp'
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp'
import './NavigationBar.css'

function NavigationBar(): React.JSX.Element {
  const show = false
  return (
    <div className="navigationBarContainer">
      <div className="fullSize">
        <KeyboardArrowDownSharpIcon />
      </div>
      {show && (
        <div>
          <KeyboardArrowRightSharpIcon />
        </div>
      )}
    </div>
  )
}

export default NavigationBar
