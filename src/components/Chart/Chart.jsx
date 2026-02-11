import { useEffect, useMemo, useRef } from 'react'
import { calculateBounds, draw } from './helper'

/**
 * Chart Component
 *
 * @param {Object} props - Component props
 * @param {Array<Object>} props.data
 * @param {boolean} [props.loading=false]
 * @param {string|null} [props.error=null]
 * @param {Object} props.chartOptions
 * @param {Object} props.chartOptions.padding
 * @param {number} props.chartOptions.gridCount
 * @param {Object} props.chartOptions.themeColors
 * @param {string} [props.chartOptions.defaultLineColor='#2563eb']
 *
 * @returns {JSX.Element} A canvas element wrapped in a container div
 */
const Chart = ({ data, loading, error, chartOptions }) => {
  const canvasRef = useRef(null)
  const wrapperRef = useRef(null)

  const bounds = useMemo(() => {
    if (!data || !data.length) return { minX: 0, maxX: 1, minY: 0, maxY: 1 }
    return calculateBounds(data)
  }, [data])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrapper = wrapperRef.current
    if (!canvas || !wrapper) return

    draw(canvas, wrapper, chartOptions, bounds, data, loading, error)
    const ro = new ResizeObserver(() => {
      draw(canvas, wrapper, chartOptions, bounds, data, loading, error)
    })
    ro.observe(wrapper)

    return () => ro.disconnect()
  }, [data, bounds, loading, error, chartOptions])

  return (
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
  )
}

export default Chart
