import { lazy } from 'react'

const Char = lazy(() => import('src/char'))
const Table = lazy(() => import('src/table'))
const FromTo = lazy(() => import('./fromTo'))

const Cbr = () => {

  return <>
    <div>
      <FromTo/>
    </div>
    <div>
      <Char/>
    </div>
    <div>
      <Table/>
    </div>
  </>
}

export default Cbr
