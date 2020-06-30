
const errors = require('@rgrannell/errors')

const { codes } = require('./constants')
const random = require('./random')
const characters = require('./characters')
const classes = require('./character-classes')
const logic = require('./logic')
const char = require('./characters')
const quantifiers = require('./quantifiers')
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





const types = {}

types.every = {

}




interfaces.json = (spec, part) => {
  const supported = Object.keys(interfaces.json)

  if (typeof part === 'string') {
    return interfaces.json.literal(spec, part)
  }

  for (const prop of supported) {
    if (part.hasOwnProperty(prop)) {
      return interfaces.json[prop](spec, part)
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

  message = ''

  for (const elem of part.every) {
    const subresult = interfaces.json(spec, elem)
    message += subresult
  }

  return message
}

interfaces.json.any = (spec, part) => {
  assert.exactProperties(part, ['any'])
  assert.type(part.any, 'object', 'any')

  throw 'x'
}

interfaces.json.digit = (spec, part) => {
  assert.type(part.digit, 'object', 'digit')

  if (part.digit.hasOwnProperty('zero')) {
    assert.type(part.digit.zero, 'boolean', 'zero')
  }

  return part.digit.zero
    ? characters.digit()
    : characters.nonZeroDigit()
}

interfaces.json.oneOf = (spec, part) => {
  assert.type(part.oneOf, 'array', 'oneOf')

  return interfaces.json(spec, random.oneOf(part.oneOf))
}

interfaces.json.notOneOf = (spec, part) => {
  assert.type(part.notOneOf, 'array', 'notOneOf')

  for (const elem of part.notOneOf) {
    assert.type(elem, 'string', 'notOneOf elem')
  }


  throw 'x'
}

interfaces.json.range = (spec, part) => {
  assert.type(part.range, 'object', 'oneOf element')
  assert.exactProperties(part.range, ['range'])

  assert.type(part.range, 'array', 'range')
  throw 'x'
}

interfaces.json.ref = (spec, part) => {
  assert.type(part, 'object', 'ref')
  assert.exactProperties(part, ['ref'])

  if (!spec.hasOwnProperty(part.ref)) {
    const specProps = Object.keys(spec)
    throw errors.badConfig(`reference "${part.ref}" does not exist in spec ${fmt.list(specProps)}`)
  }

  const refVal = spec[part.ref]
  return interfaces.json(spec, refVal)
}

interfaces.json.repeat = (spec, part) => {
  assert.type(part.repeat, 'object', 'repeat')

  let from = part.repeat.from
  if (!part.repeat.hasOwnProperty('from')) {
    from = 0
  }

  let to = part.repeat.to
  if (!part.repeat.hasOwnProperty('to')) {
    to = 10
  }

  const gen = () => interfaces.json(spec, part.repeat.value)
  const repeated = quantifiers.repeat(gen, {from, to})

  return repeated()
}

interfaces.json.optional = (spec, part) => {
  assert.type(part.optional, 'object', 'optional')

  const gen = interfaces.json(spec, part.optional)
  const optional = quantifiers.repeat(gen, { from: 0, to: 1 })

  return optional()
}

interfaces.json.literal = (spec, part) => {
  return part
}

module.exports = interfaces
