import { useState } from 'react'
import beeKeeperLogo from './assets/beehive-48.png'
import './App.css'
import Board from './components/Board'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="App">
      {
        open
        ? <Board close={() => setOpen(!open)}/>
        : <img src={beeKeeperLogo}  className="h-12 w-12 cursor-pointer keeper-logo" alt="Bee Keeper logo" onClick={() => setOpen(!open)}/>
      }
    </div>
  )
}

export default App
