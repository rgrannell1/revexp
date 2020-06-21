
const random = require('./random')

const classes = {}

/**
 * Return one of the provided generators
 *
 * @param {Array<Object>} gens
 */
classes.oneOf = gens => {
  return () => random.oneOf(gens)
}

/**
 * Return characters not in a list of characters.
 *
 * @param {num} opts.from
 * @param {num} opts.to
 *
 *
 */
classes.notOneOf = seqs => {
  return () => {
    let char = random.sample({
      ranges: [[0x000, 0x10ffff]]
    })

    while (true) {
      if (seqs.includes(char)) {
        char = random.sample({
          ranges: [[0x000, 0x10ffff]]
        })
      } else {
        break
      }
    }

    return char
  }
}

/**
 * Return characters in a range
 *
 * @param {num} opts.from
 * @param {num} opts.to
 *
 *
 */
classes.range = ({from, to}) => {

}

/**
 * Return characters not in a range
 *
 * @param {num} opts.from
 * @param {num} opts.to
 *
 */
classes.notRange = ({from, to}) => {

}

module.exports = classes
