
const json = require('./src/json')
const logic = require('./src/logic')
const characters = require('./src/characters')
const quantifiers = require('./src/quantifiers')
const classes = require('./src/character-classes')

while (true) {
  let x = json.array()
  try {
    JSON.parse(x)
  } catch (err) {
    console.log(x)
    console.log(err)
    throw 'x'
  }
  //break
}
