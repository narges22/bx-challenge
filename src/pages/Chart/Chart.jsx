// CanvasLineChart.js
import { useEffect, useMemo, useRef } from 'react'
import {
  calculateBounds,
  setupCanvas,
  drawEmptyState,
  drawGrid,
  drawAxisLabels,
  createPointMapper,
  drawLine,
} from './helper'
import { useChartData } from '../../hooks/useChartData'

const chartOptions = {
  padding: { left: 56, right: 24, top: 18, bottom: 44 },
  gridCount: 10,
  themeColors: {
    bg: '#ffffff',
    fg: '#111827',
    grid: 'rgba(17,24,39,0.10)',
  },
}

export default function CanvasLineChart() {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)

  const { data, loading, error } = useChartData()

  const bounds = useMemo(() => {
    if (!data.length) return { minX: 0, maxX: 1, minY: 0, maxY: 1 }
    return calculateBounds(data)
  }, [data])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    const canvasSetup = setupCanvas(canvas, wrapper)
    if (!canvasSetup) return
    const { ctx, cssW, cssH } = canvasSetup

    const { padding, gridCount, themeColors: colors } = chartOptions
    const { bg, fg, grid } = colors

    const draw = () => {
      ctx.clearRect(0, 0, cssW, cssH)
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, cssW, cssH)

      // Empty-state inside canvas
      if (drawEmptyState(ctx, cssW, cssH, fg, loading, error, data.length > 0)) {
        return
      }

      const plotX = padding.left
      const plotY = padding.top
      // calculate the plot width and height
      const plotW = cssW - padding.left - padding.right
      const plotH = cssH - padding.top - padding.bottom

      // Grid
      drawGrid(ctx, plotX, plotY, plotW, plotH, gridCount, grid)

      // Axes labels
      drawAxisLabels(ctx, plotX, plotY, plotW, plotH, bounds, fg)

      // Mapper
      const mapPoint = createPointMapper(bounds, plotX, plotY, plotW, plotH)

      // Lines
      for (const line of data) {
        drawLine(ctx, line, mapPoint)
      }
    }

    const ro = new ResizeObserver(() => draw())
    ro.observe(wrapper)

    draw()
    return () => ro.disconnect()
  }, [data, bounds, loading, error])

  return (
    <>
      <h3>Charts</h3>
      <div
        ref={wrapperRef}
        style={{
          width: '100%',
          height: '420px',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
        <canvas ref={canvasRef} />
      </div>
    </>
  )
}
