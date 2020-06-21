
const random = require('./random')
const { ENGINE_METHOD_ALL } = require('constants')

const logic = {}

logic.or = gens => {
  const gen = random.oneOf(gens)

  if (!gen) {
    throw new Error('no generators provided')
  }

  return gen
}

logic.and = gens => {
  return () => {
    return gens.map(gen => gen()).join('')
  }
}

module.exports = logic
