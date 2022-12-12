import { lazy } from 'react'

const Char = lazy(() => import('src/char'))
const FromTo = lazy(() => import('./fromTo'))

const Cbr = () => {

  return <>
    <div>
      <FromTo/>
    </div>
    <div>
      <Char/>
    </div>
  </>
}

export default Cbr
