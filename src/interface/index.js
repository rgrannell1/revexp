
const errors = require('@rgrannell/errors')

const { codes } = require('../commons/constants')
const random = require('../random')
const classes = require('../character-classes')
const characters = require('../characters')
const quantifiers = require('../quantifiers')

const interfaces = {}

const format = {}

format.list = elems => {
  return '[' + elems.map(elem => `"${elem}"`).join(', ') + ']'
}

format.obj = obj => {
  return JSON.stringify(obj, null, 2)
}

const hasOwnProperty = Object.prototype.hasOwnProperty

const json = (spec, part) => {
  const supported = Object.keys(json)

  if (typeof part === 'string') {
    return json.literal(spec, part)
  }

  for (const prop of supported) {
    if (hasOwnProperty(part, prop)) {
      return json[prop](spec, part)
    }
  }

  const message = 'the config object below does not use a supported config method\n' +
    format.obj(part) +
   '\n\n' +
    'valid properties are ' + supported.map(val => `'${val}'`).join(', ')

  throw errors.badConfig(message, codes.INVALID_CONFIG)
}

interfaces.json = json

json.every = (spec, part) => {
  let message = ''

  for (const elem of part.every) {
    message += json(spec, elem)
  }

  return message
}

json.any = (spec, part) => {

}

json.digit = (spec, part) => {
  return part.digit.zero
    ? characters.digit()
    : characters.nonZeroDigit()
}

json.oneOf = (spec, part) => {
  return json(spec, random.oneOf(part.oneOf))
}

json.notOneOf = (spec, part) => {
  return classes.notOneOf(part.notOneOf)()
}

json.range = (spec, part) => {
  throw new Error('not implemented.')
}

json.ref = (spec, part) => {
  if (!hasOwnProperty(spec, part.ref)) {
    const specProps = Object.keys(spec)
    throw errors.badConfig(`reference "${part.ref}" does not exist in spec ${format.list(specProps)}`)
  }

  const refVal = spec[part.ref]
  return json(spec, refVal)
}

json.repeat = (spec, part) => {
  let from = part.repeat.from
  if (!hasOwnProperty(part.repeat, 'from')) {
    from = 0
  }

  let to = part.repeat.to
  if (!hasOwnProperty(part.repeat, 'to')) {
    to = 10
  }

  const gen = () => json(spec, part.repeat.value)
  const repeated = quantifiers.repeat(gen, { from, to })

  return repeated()
}

json.optional = (spec, part) => {
  const gen = () => json(spec, part.optional)
  const optional = quantifiers.repeat(gen, { from: 0, to: 1 })

  return optional()
}

json.literal = (spec, part) => {
  return part
}

module.exports = interfaces
