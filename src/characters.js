
const random = require('./random')
const {
  ranges,
  rangeSets
} = require('./constants')

const characters = {}

characters.any = () => {
  return random.sample({
    ranges: [ranges.ALL_CHARS]
  })
}

/**
 * Return a random digit
 *
 * @return {number} return a digit
 */
characters.digit = () => {
  return random.sample({
    ranges: [ranges.DIGITS]
  })
}

/**
 * Return a random non-zero digit
 *
 * @return {number} return a digit
 */
characters.nonZeroDigit = () => {
  return random.sample({
    ranges: [ranges.NONZERO_DIGITS]
  })
}

/**
 * Return a word-character
 *
 * @return {number} return a character
 */
characters.wordChar = () => {
  return random.sample({
    ranges: rangeSets.WORD_CHAR
  })
}

/**
 * Return a unicode space-character
 *
 * @return {number} return a character
 */
characters.space = () => {
  return random.sample({
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
  return () => {
    let char
    while (!char || char === '\n') {
      const char = characters.any()
    }

    return char
  }
}

module.exports = characters
