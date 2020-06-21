
const random = require('./random')

const logic = {}

logic.or = gens => {
  const gen = random.oneOf(gens)

  if (!gen) {
    throw new Error('no generators provided')
  }

  return gen
}

module.exports = logic
