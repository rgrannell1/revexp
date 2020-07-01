
const random = require('./random')

const logic = {}

/**
 * Return one of the provided generators
 *
 * @param {Function[]} gens a list of generators
 *
 * @returns {Function} a generator
 *
 */
logic.or = gens => {
  const gen = random.oneOf(gens)

  if (!gen) {
    throw new Error(`no generators provided:\n${gens}`)
  }

  return gen
}

/**
 * Return from each provided generator in a concatenated string
 *
 * @param {Function[]} gens a list of generators
 *
 * @returns {Function} a generator
 *
 */
logic.and = gens => {
  gens.forEach(gen => {
    if (typeof gen !== 'function') {
      throw new Error(`generator was not a function: ${gen}`)
    }
  })

  return () => {
    return gens.map(gen => gen()).join('')
  }
}

module.exports = logic
