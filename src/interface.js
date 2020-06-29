
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

const format = {}

format.list = elems => {
  return '[' + elems.map(elem => `"${elem}"`).join(', ') + ']'
}

format.obj = obj => {
  return JSON.stringify(obj, null, 2)
}





assert.exactProperties = (obj, props) => {
  const objProps = Object.keys(obj)

  if (objProps.length !== props.length) {
    const fmt = format.obj(obj)
    throw errors.invalidConfig(`mismatched properties for config\n${fmt}\n. Expected the properties ${format.list(props)}, received ${format.list(objProps)}`, codes.INVALID_CONFIG)
  }
}

assert.type = (val, type, name) => {
  const valType = is(val)

  if (valType !== type) {
    const fmt = format.obj(val)
    throw errors.invalidConfig(`expected ${name} to have type "${type}" but it had type "${valType}":\n\n${fmt}\n\n`, codes.INVALID_CONFIG)
  }
}





interfaces.json = (spec, part) => {
  const supported = Object.keys(interfaces.json)

  if (typeof part === 'string') {
    return interfaces.json.literal(spec, part)
  }

  for (const prop of supported) {
    if (part.hasOwnProperty(prop)) {
      interfaces.json[prop](spec, part)
      return
    }
  }

  const message = `the config object below does not use a supported config method\n` +
    format.obj(part) +
   '\n\n' +
    'valid properties are ' + supported.map(val => `'${val}'`).join(', ')

  throw errors.badConfig(message, codes.INVALID_CONFIG)
}

interfaces.json.every = (spec, part) => {
  assert.exactProperties(part, ['every'])

  for (const elem of part.every) {
    interfaces.json(spec, elem)
  }
}

interfaces.json.any = (spec, part) => {
  assert.exactProperties(part, ['any'])
  assert.type(part.any, 'object', 'any')

}

interfaces.json.digit = (spec, part) => {
  assert.type(part.digit, 'object', 'digit')

  if (part.digit.hasOwnProperty('zero')) {
    assert.type(part.digit, 'boolean', 'zero')
  }

}

interfaces.json.oneOf = (spec, part) => {
  assert.type(part.oneOf, 'array', 'oneOf')

  for (const elem of part.oneOf) {
    interfaces.json(spec, elem)
  }
}

interfaces.json.notOneOf = (spec, part) => {
  assert.type(part.notOneOf, 'array', 'notOneOf')

  for (const elem of part.notOneOf) {
    assert.type(elem, 'string', 'notOneOf elem')

  }

}

interfaces.json.range = (spec, part) => {
  assert.type(part.range, 'object', 'oneOf element')
  assert.exactProperties(part.range, ['range'])

  assert.type(part.range, 'array', 'range')
}

interfaces.json.ref = (spec, part) => {
  assert.type(part, 'object', 'ref')
  assert.exactProperties(part, ['ref'])

  if (spec.hasOwnProperty(part.ref)) {
    const refVal = spec[part.ref]

    return interfaces.json(spec, refVal)
  } else {
    const specProps = Object.keys(spec)
    throw errors.badConfig(`reference "${part.ref}" does not exist in spec ${fmt.list(specProps)}`)
  }
}

interfaces.json.repeat = (spec, part) => {
  assert.type(part.repeat, 'object', 'repeat')


}

interfaces.json.literal = (spec, part) => {
  return part
}





module.exports = interfaces
