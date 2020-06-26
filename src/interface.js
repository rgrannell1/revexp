
const errors = require('@rgrannell/errors')

const { codes } = require('./constants')
const classes = require('./character-classes')
const logic = require('./logic')
const char = require('./characters')
const retree = require('regexp-tree')

const interfaces = {}

const assert = {}

const is = val => {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
}

const list = elems => {
  return '[' + elems.map(elem => `"${elem}"`).join(', ') + ']'
}

assert.exactProperties = (obj, props) => {
  const objProps = Object.keys(obj)

  if (objProps.length !== props.length) {
    const fmt = JSON.stringify(obj, null, 2)
    throw errors.invalidConfig(`mismatched properties for config\n${fmt}\n. Expected the properties ${list(props)}`, codes.INVALID_CONFIG)
  }
}

assert.type = (val, type, name) => {
  const valType = is(val)

  if (valType !== type) {
    const fmt = JSON.stringify(val, null, 2)
    throw errors.invalidConfig(`expected ${name} to have type "${type}" but it had type "${valType}":\n${fmt}\n`, codes.INVALID_CONFIG)
  }
}

interfaces.json = (spec, opts) => {
  if (spec.any) {
    assert.exactProperties(spec, ['any'])
    assert.type(spec.any, 'object', 'any')
  } else if (spec.digit) {
    assert.type(spec.digit, 'object', 'digit')

    if (spec.digit.hasOwnProperty('zero')) {
      assert.type(spec.digit, 'boolean', 'zero')
    }
  } else if (spec.oneOf) {
    assert.type(spec.oneOf, 'array', 'oneOf')

    for (const elem of spec.oneOf) {
    }

  } else if (spec.notOneOf) {
    assert.type(spec.notOneOf, 'array', 'notOneOf')

    for (const elem of spec.notOneOf) {
      assert.type(elem, 'string', 'notOneOf elem')
      interfaces.json(elem, opts)
    }

  } else if (spec.range) {
    assert.type(spec.range, 'object', 'oneOf element')
    assert.exactProperties(spec.range, ['range'])

    assert.type(spec.range, 'array', 'range')
  }
}

interfaces.json({
  notOneOf: ['a']
})

module.exports = interfaces
