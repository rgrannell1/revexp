
const random = require('./random')

const characters = {}

/**
 * Return a random digit
 *
 * @return {number} return a digit
 */
characters.digit = () => {
  return random.sample({
    ranges: [[48, 57]]
  })
}

/**
 * Return a word-character
 *
 * @return {number} return a character
 */
characters.wordChar = () => {
  return random.sample({
    ranges: [
      [65, 90],
      [97, 122]
    ]
  })
}

/**
 * Return a unicode space-character
 *
 * @return {number} return a character
 */
characters.space = () => {
  return random.sample({
    ranges: [
      [0x0020],
      [0x00A0],
      [0x1680],
      [0x180E],
      [0x2000],
      [0x2009, 0x200B],
      [0x202F],
      [0x205F],
      [0x3000],
      [0xFEFF]
    ]
  })
}

/**
 * Any non-line break character
 *
 * @return {number} return a character
 */
characters.nonLineBreak = () => {

}

module.exports = characters
