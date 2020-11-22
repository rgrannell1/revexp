
import * as logic from '../logic'
import * as classes from '../character-classes'
import * as quants from '../quantifiers'
import * as chars from '../characters'
import * as characters from '../characters'

/**
 * Based on https://www.json.org/json-en.html
 *
 */
const json = {}

export const string = () => {
  /**
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
   */

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
    '/'
  ])
  const character = logic.or([
    normalCodepoint
    // specials
  ])

  return logic.and([
    doubleString,
    quants.zeroOrMoreRepeat(character),
    doubleString
  ])()
}

export const whitespace = classes.oneOf([
  ' ',
  '\n',
  '\r\n',
  '\t'
])

export const exponent = logic.and([
  chars.nonZeroDigit,
  quants.zeroOrMoreRepeat(chars.digit, { to: 9 }),
  quants.onceOrNone(logic.and([
    chars.literal('.'),
    quants.oneOrMoreRepeat(chars.digit, { to: 10 })
  ])),
  classes.oneOf(['e', 'E']),
  quants.onceOrNone(chars.literal('-')),
  quants.oneOrMoreRepeat(chars.digit, { to: 2 })
])

export const number = logic.or([
  exponent,
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

export const value = () => {
  return logic.or([
    string,
    number,
    array,
    characters.literal('true'),
    characters.literal('false'),
    characters.literal('null')
  ])()
}

export const array = () => {
  return logic.and([
    characters.literal('['),
    logic.and([
      value
      // -- TODO add comma delimiting
    ]),
    characters.literal(']')
  ])()
}
