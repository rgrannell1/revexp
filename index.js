
const interfaces = require('./src/interface/')
const spec = require('./src/specs/json-config')

const result = interfaces.json(spec, spec.number)

console.log(result)
