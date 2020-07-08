
const { expect } = require('chai')
const tap = require('tap')
const mutate = require('../src/tools/mutate')

const tests = {}

tests.mutateString = () => {
  tap.pass('all characters yield without errors')

  expect(mutate.string('')).to.equal('')
  expect(mutate.string('a')).to.equal('')

  expect(mutate.string('abc')).to.have.length(2)
  expect(mutate.string('abcd')).to.have.length(3)
}

tests.mutate = () => {
  const diff = mutate({
    test () {},
    str: 'string',
    until: () => true
  })

  expect(diff.invalid).to.be.equal('string')
  expect(diff.valid).to.have.length(5)

  expect(() => {
    mutate({
      test () { throw new Error('failure') },
      str: '',
      until: () => true
    })
  }).to.throw('could not find')
}

tests.mutateString()
tests.mutate()
