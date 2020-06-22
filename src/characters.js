
const classes = require('./character-classes')
const random = require('./random')
const {
  ranges,
  rangeSets
} = require('./constants')

const characters = {}

characters.any = () => {
  return classes.range({
    ranges: [ranges.ALL_CHARS]
  })
}

/**
 * Return a random digit
 *
 * @return {number} return a digit
 */
characters.digit = () => {
  return classes.range([ranges.DIGITS])
}

/**
 * Return a random non-zero digit
 *
 * @return {number} return a digit
 */
characters.nonZeroDigit = () => {
  return classes.range([ranges.NONZERO_DIGITS])
}

/**
 * Return a word-character
 *
 * @return {number} return a character
 */
characters.wordChar = () => {
  return classes.range({
    ranges: rangeSets.WORD_CHAR
  })
}

/**
 * Return a unicode space-character
 *
 * @return {number} return a character
 */
characters.space = () => {
  return classes.range({
    ranges: rangeSets.SPACES
  })
}

/**
 * Return a literal character or character sequence
 *
 * @return {number} the provided data
 */
characters.literal = str => {
  return () => str
}

/**
 * Any non-line break character
 *
 * @return {number} return a character
 */
characters.nonLineBreak = () => {
  return classes.notOneOf(['\n'])
}

module.exports = characters
