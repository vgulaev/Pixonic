import http from 'http'
import https from 'https'
import {XMLParser} from 'fast-xml-parser'
// const config = require('./config').config();
// const {respond} = require('./respond');
// const {empty} = require('./empty');


const respond = (req, res) => {
  https.get('https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=02/03/2001&date_req2=30/03/2001&VAL_NM_RQ=R01235', cbr => {
    cbr.setEncoding('utf8')
    let rawData = ''
    cbr.on('data', (chunk) => { rawData += chunk })
    cbr.on('end', () => {
      const options = {
        ignoreAttributes: false,
        attributeNamePrefix : ''
      }

      const parser = new XMLParser(options)
      let jObj = parser.parse(rawData)

      jObj.ValCurs.Record = jObj.ValCurs.Record.map(({Value, Date}) => ({Value, Date: Date.split('.').reverse().join('.')}))

      res.end(JSON.stringify(jObj.ValCurs))
    })
  })
}

const server = http.createServer((req, res) => {
  try {
    respond(req, res)
  } catch (err) {
    console.log(err.message, err.stack)
  }
})

server.listen(8000, '0.0.0.0', () => {
  console.log(`Сервер запущен port: ${8000}`)
})
