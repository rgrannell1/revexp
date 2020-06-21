
const random = require('./random')
const { codes } = require('./constants')

const logic = {}

logic.or = gens => {
  const gen = random.oneOf(gens)

  if (!gen) {
    throw new Error(`no generators provided:\n${gens}`)
  }

  return gen
}

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
