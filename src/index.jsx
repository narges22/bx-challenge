import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Main } from './main'
import './styles/global.scss'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Main />
  </BrowserRouter>,
)
