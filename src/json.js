
const logic = require('./logic')
const classes = require('./character-classes')
const quants = require('./quantifiers')
const chars = require('./characters')

/**
 * Based on https://www.json.org/json-en.html
 *
 */
const json = {}

json.string = logic.and([
  chars.literal('"'),
  // TODO
  chars.literal('"'),
])

json.whitespace = classes.oneOf([
  '\s',
  '\n',
  '\r\n',
  '\t'
])

json.exponent = logic.and([
  quants.oneOrMoreRepeat(chars.digit, { to: 10 }),
  quants.onceOrNone(logic.and([
    chars.literal('.'),
    quants.oneOrMoreRepeat(chars.digit, { to: 10 })
  ])),
  classes.oneOf([
    chars.literal('e'),
    chars.literal('E'),
  ]),
  quants.onceOrNone(chars.literal('-')),
  quants.oneOrMoreRepeat(chars.digit, {to: 2})
])

json.number = logic.and([
  quants.onceOrNone(chars.literal('-')),
  quants.oneOrMoreRepeat(chars.digit, { to: 10 }),
  quants.onceOrNone(logic.and([
    chars.literal('.'),
    quants.oneOrMoreRepeat(chars.digit, { to: 10 })
  ]))
])

module.exports = json
