import { useMemo } from 'react'
import { useChartData } from '../../hooks/useChartData'
import layoutStyles from '../../components/Layout/Layout.module.scss'
import { useSelector } from 'react-redux'
import { getThemeColors } from '../../components/Chart/helper'
import Chart from '../../components/Chart'

export default function ChartPage() {
  const { data, loading, error } = useChartData()
  const theme = useSelector((state) => state.theme.value)

  const chartOptions = useMemo(
    () => ({
      padding: { left: 56, right: 24, top: 18, bottom: 64 },
      gridCount: 10,
      themeColors: getThemeColors(theme),
      defaultLineColor: '#2563eb'
    }),
    [theme]
  )
  if (!data) return null

  return (
    <>
      <h1 className={layoutStyles.title}>Chart</h1>
      <div>
        <Chart data={data} loading={loading} error={error} chartOptions={chartOptions} />
      </div>
    </>
  )
}
