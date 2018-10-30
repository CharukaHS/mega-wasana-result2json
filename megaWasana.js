const axios = require('axios')
const parse5 = require('parse5')
const fs = require('fs')

const getData = () => {
  let numbers = []
  let d, m, y
  let n = 1

  let result = {}

  axios.get('https://www.dialog.lk/lor/')
    .then(res => {
      let date = new Date()
      console.log(n, ' ==> ',date.getHours(), date.getMinutes());
      n++
      const document = parse5.parse(res.data.toString());
      const h3 = document.childNodes[1].childNodes[2].childNodes[1].childNodes[3].childNodes
      const div = document.childNodes[1].childNodes[2].childNodes[1].childNodes[5].childNodes

      div.forEach(element => {
        if(element.nodeName == 'li') {
          numbers.push(element.childNodes[0].value)
        }
      })

      h3.forEach(element => {
        if (element.nodeName == '#text') {
          let data = element.value.trim().split(' ')

          if (!data[1]) {
            d = data[0]
          } else {
            m = getMonth(data[0].toLowerCase())
            y = data[1]
          }
        }
      })

      result = {
        "timestamp": Date.now(),
        "date": parseInt(d),
        "month": parseInt(m),
        "year": parseInt(y),
        "numbers": numbers
      }

      fs.writeFile('result.json', JSON.stringify(result), 'utf8', (err) => {
        if (err) throw err
        console.log(result)        
      })
      
      
    })
    .catch(err => {
      result = {
        "timestamp": Date.now(),
        "error": 500,
        "error code": "0x00"
      }
      console.error(err)
    })
}

const getMonth = (param) => {
  switch (param) {
    case 'january':
      return 1
    case 'february':
      return 2
    case 'march':
      return 3
    case 'april':
      return 4
    case 'may':
      return 5
    case 'june':
      return 6
    case 'july':
      return 7
    case 'august':
      return 8
    case 'september':
      return 9
    case 'october':
      return 10
    case 'november':
      return 11
    case 'december':
      return 12
  }
}

module.exports = () => {
  getData()
}
