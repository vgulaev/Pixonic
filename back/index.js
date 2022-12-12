import http from 'http'
import https from 'https'
import url from 'url'
import { XMLParser } from 'fast-xml-parser'

const tryParseRawData = rawData => {
  const options = {
    ignoreAttributes: false,
    attributeNamePrefix : ''
  }

  const parser = new XMLParser(options)
  let jObj = parser.parse(rawData)

  jObj.ValCurs.Record = jObj.ValCurs.Record.map(({ Value, Date }) => ({
    Value: parseFloat(Value.replace(',', '.')),
    Date: Date.split('.').reverse().join('.')
  }))
  return JSON.stringify(jObj.ValCurs)
}

const respond = (req, res) => {
  const { from, to } = url.parse(req.url, true).query

  https.get(`https://www.cbr.ru/scripts/XML_dynamic.asp?date_req1=${from}&date_req2=${to}&VAL_NM_RQ=R01235`, cbr => {
    cbr.setEncoding('utf8')
    let rawData = ''
    cbr.on('data', (chunk) => { rawData += chunk })
    cbr.on('end', () => {
      try {
        const bodyAsJson = tryParseRawData(rawData)
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
        res.end(bodyAsJson)
      } catch (err) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        })
        res.end({ error: 'error' })
      }
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
