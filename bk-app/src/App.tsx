import { useState } from 'react'
import beeKeeperLogo from './assets/beehive-48.png'
import './App.css'
import Board from '../components/Board'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="App">
      {
        open
        ? <Board onClick={() => setOpen(!open)}/>
        : <img src={beeKeeperLogo}  className="keeper-logo" alt="Bee Keeper logo" onClick={() => setOpen(!open)}/>
      }
    </div>
  )
}

export default App
