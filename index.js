const mWasana = require('./megaWasana')
const express = require('express')
const morgan = require('morgan')
const corn = require('node-cron')
const path = require('path')

const app = express()
const PORT = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000 
const IP = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

/*====schedule to check wining numbers on Sunday@2000h=====*/
mWasana()
corn.schedule('0 20 * * 6', () => {
  mWasana()
})
/*=========*/

app.use(morgan("combined"))

app.get('*', (req, res) => {
  try {
    const nums = require(path.join(__dirname, 'result.json'))
    res.status(200).send(nums)
  } catch (error) {
    console.error(error)
    const errJSON = {
      "timestamp": Date.now(),
      "error": 500,
      "error code": "0x01"
    }
    res.status(500).send(errJSON)
  }

})

app.listen(PORT, IP, () => {
  console.log(`app is running on ${IP}:${PORT}`)
})
