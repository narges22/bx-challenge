export const transformData = (lines) => {
  if (!lines || !Array.isArray(lines)) return []
  // Process the lines
  return lines.map((item) => {
    // Validate item structure
    if (!item.points || !Array.isArray(item.points)) {
      return {
        name: item.name || 'Unnamed',
        color: item.color || '#000000',
        points: []
      }
    }

    // Filter out invalid points
    const validPoints = item.points.filter((p) => p && Number.isFinite(p.x) && Number.isFinite(p.y))

    // Sort points by x-coordinate
    // Points are already validated, so x values are guaranteed to be numbers
    const sortedPoints = [...validPoints].sort((a, b) => a.x - b.x)

    return {
      name: item.name || 'Unnamed',
      color: item.color || '#000000',
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

// Sets up canvas dimensions and device pixel ratio
export const setupCanvas = (canvas, wrapper) => {
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const rect = wrapper.getBoundingClientRect()
  const cssW = Math.max(320, Math.floor(rect.width))
  const cssH = Math.max(240, Math.floor(rect.height))
  const dpr = window.devicePixelRatio || 1
  // set the CSS size
  canvas.style.width = `${cssW}px`
  canvas.style.height = `${cssH}px`
  // set the size base on  the device ratio
  canvas.width = Math.floor(cssW * dpr)
  canvas.height = Math.floor(cssH * dpr)

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  return { ctx, cssW, cssH }
}

// Handle Empty State
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

// Draws grid lines on the canvas

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

// Draws axis labels

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

// A mapper function that converts data coordinates from regular axis to canvas coordinates

export const createPointMapper = (bounds, chartLeft, chartTop, chartWidth, chartHeight) => {
  // configure the varibales once and reuse the map function for each ponit
  const { minX, maxX, minY, maxY } = bounds
  return (x, y) => {
    const normalizedX = (x - minX) / (maxX - minX)
    const normalizedY = (y - minY) / (maxY - minY)
    return {
      cx: chartLeft + normalizedX * chartWidth,
      // because y-axis in inverted in canvas
      cy: chartTop + (1 - normalizedY) * chartHeight
    }
  }
}

//  Draws a line with markers on the canvas

export const drawLine = (ctx, line, mapPoint) => {
  const pts = line.points
  if (!pts || pts.length === 0) return

  ctx.strokeStyle = line.color || '#2563eb'
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

  // Add markers to the line
  ctx.fillStyle = line.color || '#2563eb'
  for (let i = 0; i < pts.length; i++) {
    const p = mapPoint(pts[i].x, pts[i].y)
    ctx.beginPath()
    ctx.arc(p.cx, p.cy, 2.5, 0, Math.PI * 2)
    ctx.fill()
  }
}

// Draws legend at the bottom of the chart
export const drawLegend = (ctx, lines, chartLeft, chartTop, chartWidth, chartHeight, textColor) => {
  if (!lines || lines.length === 0) return

  const legendSquareSize = 12
  const legendSpacing = 16
  const legendSquarePadding = 6
  const legendY = chartTop + chartHeight + legendSpacing

  ctx.fillStyle = textColor
  ctx.font = '12px system-ui, -apple-system, Segoe UI, Roboto, Arial'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  // to center the legend (text not included)
  let currentX =
    chartLeft +
    (chartWidth / 2 - (legendSquareSize + legendSquarePadding + legendSpacing) * lines.length)

  for (const line of lines) {
    const color = line.color || '#2563eb'
    const name = line.name || 'Unnamed'

    // Draw colored square
    ctx.fillStyle = color
    ctx.fillRect(currentX, legendY, legendSquareSize, legendSquareSize)

    // Draw line name
    ctx.fillStyle = textColor
    const textX = currentX + legendSquareSize + legendSquarePadding
    const textY = legendY + legendSquareSize / 2
    ctx.fillText(name, textX, textY)

    // Calculate next position
    const textWidth = ctx.measureText(name).width
    currentX += legendSquareSize + legendSquarePadding + textWidth + legendSpacing
  }
}
