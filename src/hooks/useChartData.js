import { useEffect, useState } from 'react'
import { transformData } from '../pages/Chart/helper'

export function useChartData() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/chart-data')

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        const transformedData = transformData(result.items)
        setData(transformedData)
        setError(null)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchChartData()
  }, [])

  return { data, loading, error }
}
