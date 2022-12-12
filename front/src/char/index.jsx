import { useEffect, useRef } from 'react'
import { useSeriesData } from './useData'
import { lineChart } from './lineChar'
import { useSeries } from 'src/cbr/fromTo/useFromTo'

const Char = () => {
  const svgRef = useRef(null)
  const { data: series, dataUpdatedAt: seriesUpdatedAt } = useSeries()
  const query = useSeriesData()

  useEffect(() => {
    if (!query.data) return

    const prepared = query.data.map((d, index) => d.Record.map(r => ({ z: index, Date: r.Date, Value: r.Value }))).flat()
    const values = prepared.map(r => r.Value)
    const yDomain = [Math.min(...values) * 0.95, Math.max(...values) * 1.05]

    lineChart(prepared, svgRef.current, {
      x: d => new Date(d.Date),
      y: d => d.Value,
      z: d => d.z,
      yDomain,
      color: id => series[id].color || 'red',
    })
  }, [query.dataUpdatedAt, seriesUpdatedAt])

  return <svg ref={svgRef}/>
}

export default Char
