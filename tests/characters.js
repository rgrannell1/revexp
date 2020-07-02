
const tap = require('tap')
const characters = require('../src/characters')
const utils = require('./utils/index')

const tests = {}

tests.runsWithoutError = () => {
  utils.repeat(() => {
    characters.any()
    characters.digit()
    characters.nonZeroDigit()
    characters.space()
    characters.literal('a')
    characters.nonLineBreak()
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
