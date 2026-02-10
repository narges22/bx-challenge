import { Routes, Route } from 'react-router-dom'
import Chart from '../pages/Chart'
import Buttons from '../pages/Buttons'
import Settings from '../pages/Settings'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/chart" element={<Chart />} />
      <Route path="/buttons" element={<Buttons />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  )
}
