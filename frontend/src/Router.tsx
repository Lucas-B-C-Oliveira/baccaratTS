import { Routes, Route } from 'react-router-dom'
import { Control } from './windows/Control'
import { Scoreboard } from './windows/Scoreboard/index'

export function Router() {
  console.log('Cheguei no Router') //! TODO: Remove this commment
  return (
    <Routes>
      <Route path="/" element={<Scoreboard />} />
      <Route path="/control" element={<Control />} />
    </Routes>
  )
}
