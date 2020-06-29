
const logic = require('../logic')
const classes = require('../character-classes')
const quants = require('../quantifiers')
const chars = require('../characters')
const characters = require('../characters')

/**
 * Based on https://www.json.org/json-en.html
 *
 */
const json = {}

json.string = () => {
  const specials = classes.oneOf([
    '\\"',
    '\\',
    '\\/',
    '\\b',
    '\\f',
    '\\n',
    '\\r',
    '\\t'
  ])
  const doubleString = chars.literal('"')
  const normalCodepoint = classes.notOneOf([
    '\\"',
    '\\',
    '\\/',
    '\\b',
    '\\f',
    '\\n',
    '\\r',
    '\\t',

    // -- tmp
    '"',
    '\\',
    '\/',
  ])
  const character = logic.or([
    normalCodepoint,
    //specials
  ])

  return logic.and([
    doubleString,
    quants.zeroOrMoreRepeat(character),
    doubleString,
  ])()
}

json.whitespace = classes.oneOf([
  '\s',
  '\n',
  '\r\n',
  '\t'
])

json.exponent = logic.and([
  chars.nonZeroDigit,
  quants.zeroOrMoreRepeat(chars.digit, { to: 9 }),
  quants.onceOrNone(logic.and([
    chars.literal('.'),
    quants.oneOrMoreRepeat(chars.digit, { to: 10 })
  ])),
  classes.oneOf(['e', 'E']),
  quants.onceOrNone(chars.literal('-')),
  quants.oneOrMoreRepeat(chars.digit, {to: 2})
])

json.number = logic.or([
  json.exponent,
  logic.and([
    quants.onceOrNone(chars.literal('-')),
    chars.nonZeroDigit,
    quants.zeroOrMoreRepeat(chars.digit, { to: 9 }),
    quants.onceOrNone(logic.and([
      chars.literal('.'),
      quants.oneOrMoreRepeat(chars.digit, { to: 10 })
    ]))
  ])
])

json.value = () => {
  return logic.or([
    json.string,
    json.number,
    json.array,
    characters.literal('true'),
    characters.literal('false'),
    characters.literal('null')
  ])()
}

json.array = () => {
  return logic.and([
    characters.literal('['),
    logic.and([
      json.value,
      // -- TODO add comma delimiting
    ]),
    characters.literal(']')
  ])()
}

module.exports = json
