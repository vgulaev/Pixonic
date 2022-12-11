import { lazy, useEffect } from 'react'


// import reactLogo from './assets/react.svg'
// import './App.css'

const Char = lazy(() => import('./char'))

function App() {

  useEffect(() => {
    fetch('https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=02/03/2001&date_req2=30/03/2001&VAL_NM_RQ=R01235', {
      // mode: 'no-cors'
      method: 'GET',
      credentials: 'omit'
    })
      .then(res => res.text())
      .then(res => console.log('********', res))
      // .then(data => console.log(data))
  }, [])
  return <>
    <input type='date'/>
    <input type='date'/>
    <div>
      <Char/>
    </div>
  </>
}

export default App
