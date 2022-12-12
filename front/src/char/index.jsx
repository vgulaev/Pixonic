import { useEffect, useRef } from 'react'
import { useData } from './useData'
import { lineChart } from './lineChar'

const Char = () => {
  const svgRef = useRef(null)
  const query = useData()

  useEffect(() => {
    if (!query.data?.Record?.length) return

    const width = 1000
    const values = query.data.Record.map(r => r.Value)
    const yDomain = [Math.min(...values) * 0.95, Math.max(...values) * 1.05]

    console.log(yDomain)

    lineChart(query.data.Record, svgRef.current, {
      x: d => new Date(d.Date),
      y: d => d.Value,
      z: () => 1,
      width,
      height: 500,
      yDomain,
      color: id => 1 == id ? 'red' : 'green',
    })
  }, [query.data?.Record?.length, query.data?.DateRange1, query.data?.DateRange2])

  return <svg ref={svgRef} width={1000} height={1000}/>
}

export default Char
