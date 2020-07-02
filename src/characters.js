
const classes = require('./character-classes')
const {
  ranges,
  rangeSets
} = require('./commons/constants')

const characters = {}

characters.any = () => {
  return classes.range([ranges.ALL_CHARS])
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
 * Return a unicode space-character
 *
 * @return {number} return a character
 */
characters.space = () => {
  return classes.range(rangeSets.SPACES)
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
