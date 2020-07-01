
const tap = require('tap')
const json = require('../src/specs/json-config')
const interface = require('../src/interface')
const tools = require('../src/tools')
const { test } = require('tap')
const random = require('../src/random')
const quantifiers = require('../src/quantifiers')
const { repeat } = require('../src/quantifiers')

const tests = {}

tests.repeat = () => {
  const cases = [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3]
  ]

  for (const [from, to, expected] of cases) {
    repeat(() => {
      const repeated = quantifiers.repeat(() => 'a', { from, to })()

      if (repeated.length > to) {
        throw new Error(`${repeated} was too long`)
      }

      if (repeated.length < from) {
        throw new Error(`${repeated} was too short`)
      }
    }, 10_000)

    tap.pass(`repeat ${from}...${to} tests passed`)
  }
}

tests.repeat()