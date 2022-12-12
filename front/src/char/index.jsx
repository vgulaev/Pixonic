import * as d3 from 'd3'
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

    const prepared = query.data.map((d, index) => d.Record.map((r, jj) => ({
      z: index,
      x: series.length > 1 ? jj : new Date(r.Date),
      Value: r.Value
    }))).flat()

    const values = prepared.map(r => r.Value)
    const yDomain = [Math.min(...values) * 0.95, Math.max(...values) * 1.05]

    const opt = {
      x: d => d.x,
      y: d => d.Value,
      z: d => d.z,
      color: id => series[id].color || 'red',
      yDomain,
    }

    if (series.length > 1) {
      opt.xType = d3.scaleLinear
    }

    lineChart(prepared, svgRef.current, opt)
  }, [query.dataUpdatedAt, seriesUpdatedAt])

  return <svg ref={svgRef}/>
}

export default Char
