
const classes = {}

/**
 * Return one of the provided generators
 *
 * @param {Array<Object>} gens
 */
classes.oneOf = gens => {
  return random.oneOf(gens)
}

/**
 * Return characters not in a range
 *
 * @param {num} opts.from
 * @param {num} opts.to
 *
 *
 */
classes.notOneOf = gens => {

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
