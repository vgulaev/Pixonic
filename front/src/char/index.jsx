import {useEffect, useRef} from 'react'
import { lineChart } from './lineChar'
import { testData } from './data'

const Char = () => {
  const svgRef = useRef(null)

  useEffect(() => {
    const width = 1000
    console.log(testData)
    const chart = lineChart(testData, svgRef.current, {
      x: d => d.date,
      y: d => d.close,
      z: d => d.division,
      // yLabel: 'Rub',
      width,
      height: 500,
      color: id => 1 == id ? 'red' : 'green',
      voronoi: false // if true, show Voronoi overlay
    })
    // svgRef.current.innerHTML = chart.innerHTML
    console.log(chart)

  }, [])

  return <svg ref={svgRef} width={1000} height={1000}/>
}
// const svgRef = React.useRef(null);

export default Char
