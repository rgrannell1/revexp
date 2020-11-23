
import * as tap from 'tap'

import tools from '../src/tools'

import builder from '../src/json/builder.js'
import * as jsonSpec from '../src/json/spec.js'

const summariseCases = <I>(entry:I) => {
  return JSON.stringify(entry, null, 2)
}

interface Tests {
  [key: string]: any
}

const tests:Tests = {}

tests.jsonParses = (name:string, th:Function) => {
  const failure = tools.shrink({
    test(str:string) {
      JSON.parse(str)
    },
    gen: th,
    until: tools.shrink.until.timeElapsed(2000),
    all: false
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
  ['json.object', jsonSpec.object],
  ['json.string', jsonSpec.string],
  ['json.number', jsonSpec.number],
  ['json.exponent', jsonSpec.exponent],
  ['json.number', jsonSpec.number],
  ['json.array', jsonSpec.array],
  ['json.value', jsonSpec.value]
]

for (const [name, config] of cases) {
  tests.jsonParses(name, () => builder(jsonSpec, config))
}
