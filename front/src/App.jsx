import { lazy } from 'react'
// import reactLogo from './assets/react.svg'
// import './App.css'

const Char = lazy(() => import('./char'))

function App() {
  return <>
    Hello!!!
    <Char/>
  </>
}

export default App
