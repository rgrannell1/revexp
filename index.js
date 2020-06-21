
const json = require('./src/json')
const logic = require('./src/logic')
const characters = require('./src/characters')
const quantifiers = require('./src/quantifiers')
const classes = require('./src/character-classes')


while (true) {
  let x = json.number()
  let y = parseFloat(x, 10)
  console.log(y)
  break
}
