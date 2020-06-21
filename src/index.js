
const logic = require('./logic')
const characters = require('./characters')
const quantifiers = require('./quantifiers')

const word = logic.or([
  quantifiers.onceOrNone(characters.digit),
  characters.wordChar
])

console.log(word())
