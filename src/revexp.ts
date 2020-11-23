
import * as jsonPkg from './json/spec.js'
import builderPkg from './core/builder.js'

import {
  diff,
  evolve,
  shrink
} from './tools/index.js'

export const tools = {
  diff,
  evolve,
  shrink
}

export const jsonSpec = jsonPkg
export const builder = builderPkg

import {
  oneOf,
  notOneOf,
  range
} from './core/character-classes.js'

import {
  any,
  digit,
  nonZeroDigit,
  space,
  literal,
  nonLineBreak,
} from './core/characters.js'

import {
  and,
  or
} from './core/logic.js'

import {
  repeat
} from './core/quantifiers.js'

export const parts = {
  oneOf,
  notOneOf,
  range,
  any,
  digit,
  nonZeroDigit,
  space,
  literal,
  nonLineBreak,
  and,
  or,
  repeat
}
