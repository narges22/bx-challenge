import { useLocation } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import ThemeSync from './components/SyncTheme'
import Layout from './components/Layout'
import Menu from './components/Menu'

export const Main = () => {
  const location = useLocation()

  return (
    <>
      <ThemeSync />
      <Layout>
        <>
          <Menu />
          <AppRoutes />
        </>
      </Layout>
    </>
  )
}
