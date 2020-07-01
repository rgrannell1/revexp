
const tools = require('./src/tools')

const interfaces = require('./src/interface/')
const spec = require('./src/specs/json-config')

const test = val => JSON.parse(val)
const gen = () => interfaces.json(spec, spec.object)

const res = tools.shrink({
  test,
  gen,
  until: tools.shrink.until.timeElapsed(300000)
})

if (res) {
  const mutated = tools.mutate({
    test,
    str: res,
    until: tools.shrink.until.timeElapsed(100 * 1000)
  })

  console.log('\n\n\ndiff:')
  tools.diff.show(mutated.invalid, mutated.valid)
} else {
  console.log('no failures!')
}
