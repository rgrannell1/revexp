
const distributions = {}

/**
 * Choose a random integer in a range
 *
 * @param {num} opts.from the lower range
 * @param {num} opts.to the upper range
 *
 * @return {number} an integer in a range
 */
distributions.uniform = ({from = 0, to}) => {
  return from + Math.floor(Math.random() * (to - from))
}

module.exports = distributions
