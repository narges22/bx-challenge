import { Routes, Route } from 'react-router-dom'
import Chart from '../pages/Chart'
import Buttons from '../pages/Buttons'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/chart" element={<Chart />} />
      <Route path="/buttons" element={<Buttons />} />
    </Routes>
  )
}
