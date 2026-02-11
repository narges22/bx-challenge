// CanvasLineChart.js
import { useEffect, useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'
import {
  calculateBounds,
  setupCanvas,
  drawEmptyState,
  drawGrid,
  drawAxisLabels,
  createPointMapper,
  drawLine,
  drawLegend
} from './helper'
import { useChartData } from '../../hooks/useChartData'
import layoutStyles from '../../components/Layout/Layout.module.scss'

const getThemeColors = (theme) => {
  if (theme === 'dark') {
    return {
      bg: '#0b0f19',
      text: '#f5f5f5',
      grid: 'rgba(245, 245, 245, 0.10)'
    }
  }
  return {
    bg: '#ffffff',
    text: '#111827',
    grid: 'rgba(17,24,39,0.10)'
  }
}

export default function CanvasLineChart() {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)
  const theme = useSelector((state) => state.theme.value)

  const { data, loading, error } = useChartData()

  const bounds = useMemo(() => {
    if (!data.length) return { minX: 0, maxX: 1, minY: 0, maxY: 1 }
    return calculateBounds(data)
  }, [data])

  const chartOptions = useMemo(
    () => ({
      padding: { left: 56, right: 24, top: 18, bottom: 64 },
      gridCount: 10,
      themeColors: getThemeColors(theme)
    }),
    [theme]
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const canvasSetup = setupCanvas(canvas, wrapper)
    if (!canvasSetup) return
    const { ctx, cssW, cssH } = canvasSetup

    const { padding, gridCount, themeColors: colors } = chartOptions
    const { bg, text, grid } = colors

    const draw = () => {
      ctx.clearRect(0, 0, cssW, cssH)
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, cssW, cssH)

      // Empty-state inside canvas
      if (drawEmptyState(ctx, cssW, cssH, text, loading, error, data.length > 0)) {
        return
      }

      const chartLeft = padding.left
      const chartTop = padding.top
      // calculate the chart width and height
      const chartWidth = cssW - padding.left - padding.right
      const chartHeight = cssH - padding.top - padding.bottom

      // Grid
      drawGrid(ctx, chartLeft, chartTop, chartWidth, chartHeight, gridCount, grid)

      // Axes labels
      drawAxisLabels(ctx, chartLeft, chartTop, chartWidth, chartHeight, bounds, text)

      // Mapper closure
      const mapPoint = createPointMapper(bounds, chartLeft, chartTop, chartWidth, chartHeight)

      // Lines
      for (const line of data) {
        drawLine(ctx, line, mapPoint)
      }

      // Legend
      drawLegend(ctx, data, chartLeft, chartTop, chartWidth, chartHeight, text)
    }

    const ro = new ResizeObserver(() => draw())
    ro.observe(wrapper)

    draw()
    return () => ro.disconnect()
  }, [data, bounds, loading, error, chartOptions])

  return (
    <>
      <h1 className={layoutStyles.title}>Chart</h1>
      <div
        ref={wrapperRef}
        style={{
          width: '100%',
          height: '420px',
          borderRadius: 12,
          overflow: 'hidden'
        }}>
        <canvas ref={canvasRef} />
      </div>
    </>
  )
}
