
const logic = require('./logic')
const characters = require('./characters')
const quantifiers = require('./quantifiers')
const classes = require('./character-classes')

const word = logic.and([
  quantifiers.oneOrMoreRepeat(characters.digit),
  characters.wordChar
])

console.log(word())
