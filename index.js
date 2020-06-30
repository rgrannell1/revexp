
const tools = require('./src/tools')
const interfaces = require('./src/interface/')
const spec = require('./src/specs/json-config')
const { json } = require('./src/interface/')

const res = tools.shrink({
  test (val) {
    JSON.parse(val)
  },
  gen () {
    return interfaces.json(spec, spec.object)
  },
  until: tools.shrink.until.timeElapsed(10000)
})

console.log(res)