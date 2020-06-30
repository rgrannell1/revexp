
const interfaces = require('./src/interface')
const spec = require('./src/specs/json-config')

const result = interfaces.json(spec, spec.exponent)

console.log(result)
