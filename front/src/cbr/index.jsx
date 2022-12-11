import { lazy } from 'react'

const Char = lazy(() => import('src/char'))

const Cbr = () => {

  return <>
    <input type='date'/>
    <input type='date'/>
    <div>
      <Char/>
    </div>
  </>
}

export default Cbr
