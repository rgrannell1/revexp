
import * as tap from 'tap'

import * as json from '../src/json/'
import load from '../src/load'
import tools from '../src/tools'

const summariseCases = entry => {
  return JSON.stringify(entry, null, 2)
}

const tests = {}

tests.jsonParses = (name, gen) => {
  const failure = tools.shrink({
    test(str) {
      JSON.parse(str)
    },
    gen,
    until: tools.shrink.until.timeElapsed(2000)
  })

  if (failure) {
    const message = 'expected zero failing cases\n\n:' +
      summariseCases(failure)
    throw new Error(message)
  } else {
    tap.pass(`${name} parse correctly.`)
  }
}

const cases = [
  ['json.object', json.object],
  ['json.string', json.string],
  ['json.number', json.number],
  ['json.exponent', json.exponent],
  ['json.number', json.number],
  ['json.array', json.array],
  ['json.value', json.value]
]

for (const [name, config] of cases) {
  tests.jsonParses(name, () => load(json, config))
}
