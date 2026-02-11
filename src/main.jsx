import { useLocation } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import ThemeSync from './components/SyncTheme'
import Layout from './components/Layout'

export const Main = () => {
  const location = useLocation()
  const maxWidth = location.pathname === '/settings' ? 800 : 1200

  return (
    <>
      <ThemeSync />
      <Layout maxWidth={maxWidth}>
        <AppRoutes />
      </Layout>
    </>
  )
}
