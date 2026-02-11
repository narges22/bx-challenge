import AppRoutes from './routes/AppRoutes'
import ThemeSync from './components/SyncTheme'
import Layout from './components/Layout'
import Menu from './components/Menu'

export const Main = () => {
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
