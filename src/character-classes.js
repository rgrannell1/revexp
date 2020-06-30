
const { ranges } = require('./commons/constants')
const random = require('./random')

const classes = {}

// -- get your game on.

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
    let char = classes.range([ranges.ALL_CHARS])

    while (true) {
      // -- update char until one that isn't in seqs is created
      // -- potentially non-terminating.
      if (seqs.includes(char)) {
        char = classes.range([ranges.ALL_CHARS])
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
classes.range = ranges => {
  return random.sample({ranges})
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
