
const tap = require('tap')
const { repeat } = require('../src/quantifiers')
const characters = require('../src/characters')

const tests = {}

tests.runsWithoutError = () => {
  repeat(() => {
    characters.any()()
    characters.digit()()
    characters.nonZeroDigit()()
    characters.wordChar()()
    characters.space()()
    characters.literal('a')()
    characters.nonLineBreak()()
  }, 10000)

  tap.pass('all characters yield without errors')
}

tests.literalYieldsAsExpected = () => {
  if (characters.literal('a')() !== 'a') {
    throw new Error('invalid character returned')
  }
}

tests.runsWithoutError()
tests.literalYieldsAsExpected()
