
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

interfaces.json = (spec, part) => {
  const supported = Object.keys(interfaces.json)
  for (const prop of supported) {
    if (part.hasOwnProperty(prop)) {
      interfaces.json[prop](spec, part)
      return
    }
  }

  const message = `the config object below does not use a supported config method\n` +
    JSON.stringify(part, null, 2) +
   '\n\n' +
    'valid properties are ' + supported.map(val => `'${val}'`).join(', ')

  throw errors.badConfig(message, codes.INVALID_CONFIG)
}

interfaces.json.every = part => {
  assert.exactProperties(part, ['every'])

  for (const elem of part.every) {
    interfaces.json(spec, part)
  }
}

interfaces.json.any = part => {
  assert.exactProperties(part, ['any'])
  assert.type(part.any, 'object', 'any')

}

interfaces.json.digit = part => {
  assert.type(part.digit, 'object', 'digit')

  if (part.digit.hasOwnProperty('zero')) {
    assert.type(part.digit, 'boolean', 'zero')
  }

}

interfaces.json.oneOf = part => {
  assert.type(part.oneOf, 'array', 'oneOf')

  for (const elem of part.oneOf) {

  }
}

interfaces.json.notOneOf = part => {
  assert.type(part.notOneOf, 'array', 'notOneOf')

  for (const elem of part.notOneOf) {
    assert.type(elem, 'string', 'notOneOf elem')
    interfaces.json(elem, opts)
  }

}

interfaces.json.range = part => {
  assert.type(part.range, 'object', 'oneOf element')
  assert.exactProperties(part.range, ['range'])

  assert.type(part.range, 'array', 'range')


}

interfaces.json.ref = part => {
  assert.type(part.ref, 'object', 'ref')

}

const spec = require('./specs/json-config')
interfaces.json(spec, spec.array)

module.exports = interfaces
