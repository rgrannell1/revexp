
const tap = require('tap')
const json = require('../src/json')
const tools = require('../src/tools')

const summariseCases = failures => {
  const entry = failures[failures.length - 1].split('')
  return JSON.stringify(entry, null, 2)
}

const tests = {}

tests.jsonParses = (name, gen) => {
  const failures = tools.shrink({
    test(str) {
      JSON.parse(str)
    },
    gen,
    all: true,
    until: tools.shrink.until.count(100_000)
  })

  if (failures.length > 0) {
    const message = `expected zero failing cases, found ${failures.length}:` +
      summariseCases(failures)
    throw new Error(message)
  } else {
    tap.pass(`${name} parse correctly.`)
  }
}

const cases = [
  ['json.exponent', json.exponent],
  ['json.number', json.number],
  ['json.string', json.string],
  ['json.value', json.value],
  ['json.array', json.array]
]

for (const [name, gen] of cases) {
  tests.jsonParses(name, gen)
}
