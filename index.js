
const logic = require('./src/logic')
const characters = require('./src/characters')
const quantifiers = require('./src/quantifiers')
const classes = require('./src/character-classes')

const word = logic.and([
  characters.literal('abc'),
  characters.literal('abc'),
  quantifiers.oneOrMoreRepeat(characters.digit),
  characters.wordChar
])

