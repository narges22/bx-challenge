export const transformData = (lines, defaultLineColor) => {
  if (!lines || !Array.isArray(lines)) return []
  return lines.map((item) => {
    if (!item.points || !Array.isArray(item.points)) {
      return {
        name: item.name || 'Unnamed',
        color: item.color || defaultLineColor,
        points: []
      }
    }

    const validPoints = item.points.filter((p) => p && Number.isFinite(p.x) && Number.isFinite(p.y))

    const sortedPoints = [...validPoints].sort((a, b) => a.x - b.x)

    return {
      name: item.name || 'Unnamed',
      color: item.color || defaultLineColor,
      points: sortedPoints
    }
  })
}

export const calculateBounds = (lines) => {
  let minX = Infinity,
    maxX = -Infinity,
    minY = Infinity,
    maxY = -Infinity

  for (const line of lines) {
    for (const point of line.points) {
      const { x, y } = point
      if (x < minX) minX = x
      if (x > maxX) maxX = x
      if (y < minY) minY = y
      if (y > maxY) maxY = y
    }
  }
  // what if it's a straight vertical or horizontal line?
  // to avoid x/0 in createPointMapper function
  if (minX === maxX) {
    minX -= 1
    maxX += 1
  }
  if (minY === maxY) {
    minY -= 1
    maxY += 1
  }

  return { minX, maxX, minY, maxY }
}

export const setupCanvas = (canvas, wrapper) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const rect = wrapper.getBoundingClientRect()
  const cssW = Math.max(320, Math.floor(rect.width))
  const cssH = Math.max(240, Math.floor(rect.height))
  const dpr = window.devicePixelRatio || 1
  canvas.style.width = `${cssW}px`
  canvas.style.height = `${cssH}px`
  // set the size base on  the device ratio
  canvas.width = Math.floor(cssW * dpr)
  canvas.height = Math.floor(cssH * dpr)

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  return { ctx, cssW, cssH }
}

export const drawEmptyState = (ctx, cssW, cssH, text, loading, error, hasData) => {
  ctx.fillStyle = text
  ctx.font = '14px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.textAlign = 'center'

  if (loading) {
    ctx.fillText('Loading…', cssW / 2, cssH / 2)
    return true
  }

  if (error) {
    ctx.fillText(`Error: ${error}`, cssW / 2, cssH / 2)
    return true
  }

  if (!hasData) {
    ctx.fillText('No data', cssW / 2, cssH / 2)
    return true
  }

  return false
}

export const drawGrid = (
  ctx,
  chartLeft,
  chartTop,
  chartWidth,
  chartHeight,
  gridCount,
  gridColor
) => {
  ctx.strokeStyle = gridColor
  ctx.lineWidth = 1

  for (let i = 0; i <= gridCount; i++) {
    const t = i / gridCount

    // vertical
    const x = chartLeft + t * chartWidth
    ctx.beginPath()
    ctx.moveTo(x, chartTop)
    ctx.lineTo(x, chartTop + chartHeight)
    ctx.stroke()

    // horizontal
    const y = chartTop + t * chartHeight
    ctx.beginPath()
    ctx.moveTo(chartLeft, y)
    ctx.lineTo(chartLeft + chartWidth, y)
    ctx.stroke()
  }
}

export const drawAxisLabels = (ctx, chartLeft, chartTop, chartWidth, chartHeight, bounds, text) => {
  ctx.fillStyle = text
  ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Arial'

  const { minX, maxX, minY, maxY } = bounds

  ctx.textAlign = 'left'
  ctx.fillText(String(minY.toFixed(2)), 8, chartTop + chartHeight)
  ctx.fillText(String(maxY.toFixed(2)), 8, chartTop + 12)

  ctx.textAlign = 'center'
  ctx.fillText(String(minX.toFixed(2)), chartLeft, chartTop + chartHeight + 28)
  ctx.fillText(String(maxX.toFixed(2)), chartLeft + chartWidth, chartTop + chartHeight + 28)
}

export const createPointMapper = (bounds, chartLeft, chartTop, chartWidth, chartHeight) => {
  const { minX, maxX, minY, maxY } = bounds
  return (x, y) => {
    const normalizedX = (x - minX) / (maxX - minX)
    const normalizedY = (y - minY) / (maxY - minY)
    return {
      cx: chartLeft + normalizedX * chartWidth,
      cy: chartTop + (1 - normalizedY) * chartHeight
    }
  }
}

export const drawLine = (ctx, line, mapPoint, defaultLineColor) => {
  const pts = line.points
  if (!pts || pts.length === 0) return

  ctx.strokeStyle = line.color || defaultLineColor
  ctx.lineWidth = 2
  ctx.lineJoin = 'round'
  ctx.lineCap = 'round'
  ctx.beginPath()

  const first = mapPoint(pts[0].x, pts[0].y)
  ctx.moveTo(first.cx, first.cy)

  for (let i = 1; i < pts.length; i++) {
    const p = mapPoint(pts[i].x, pts[i].y)
    ctx.lineTo(p.cx, p.cy)
  }

  ctx.stroke()

  ctx.fillStyle = line.color || defaultLineColor
  for (let i = 0; i < pts.length; i++) {
    const p = mapPoint(pts[i].x, pts[i].y)
    ctx.beginPath()
    ctx.arc(p.cx, p.cy, 2.5, 0, Math.PI * 2)
    ctx.fill()
  }
}

export const drawLegend = (
  ctx,
  lines,
  chartLeft,
  chartTop,
  chartWidth,
  chartHeight,
  textColor,
  defaultLineColor
) => {
  if (!lines || lines.length === 0) return

  const legendSquareSize = 12
  const legendSpacing = 16
  const legendSquarePadding = 6
  const legendY = chartTop + chartHeight + legendSpacing

  ctx.fillStyle = textColor
  ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  let currentX =
    chartLeft +
    (chartWidth / 2 - (legendSquareSize + legendSquarePadding + legendSpacing) * lines.length)

  for (const line of lines) {
    const color = line.color || defaultLineColor
    const name = line.name || 'Unnamed'

    ctx.fillStyle = color
    ctx.fillRect(currentX, legendY, legendSquareSize, legendSquareSize)

    ctx.fillStyle = textColor
    const textX = currentX + legendSquareSize + legendSquarePadding
    const textY = legendY + legendSquareSize / 2
    ctx.fillText(name, textX, textY)

    const textWidth = ctx.measureText(name).width
    currentX += legendSquareSize + legendSquarePadding + textWidth + legendSpacing
  }
}

export const draw = (canvas, wrapper, chartOptions, bounds, data, loading, error) => {
  const canvasSetup = setupCanvas(canvas, wrapper)
  if (!canvasSetup) return
  const { ctx, cssW, cssH } = canvasSetup

  const { padding, gridCount, themeColors: colors, defaultLineColor } = chartOptions
  const { bg, text, grid } = colors

  ctx.clearRect(0, 0, cssW, cssH)
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, cssW, cssH)

  if (drawEmptyState(ctx, cssW, cssH, text, loading, error, data?.length > 0)) {
    return
  }

  const chartLeft = padding.left
  const chartTop = padding.top
  const chartWidth = cssW - padding.left - padding.right
  const chartHeight = cssH - padding.top - padding.bottom

  drawGrid(ctx, chartLeft, chartTop, chartWidth, chartHeight, gridCount, grid)

  drawAxisLabels(ctx, chartLeft, chartTop, chartWidth, chartHeight, bounds, text)

  const mapPoint = createPointMapper(bounds, chartLeft, chartTop, chartWidth, chartHeight)

  for (const line of data) {
    drawLine(ctx, line, mapPoint, defaultLineColor)
  }

  drawLegend(ctx, data, chartLeft, chartTop, chartWidth, chartHeight, text, defaultLineColor)
}

export const getThemeColors = (theme) => {
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
