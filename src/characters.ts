
import * as classes from './character-classes.js'
import {
  ranges,
  rangeSets
} from './commons/constants.js'
import {
  Generator
} from './types.js'

export const any = () => {
  return classes.range([ranges.ALL_CHARS])
}

/**
 * Return a random digit
 *
 * @return {number} return a digit
 */
export const digit = () => {
  return classes.range([ranges.DIGITS])
}

/**
 * Return a random non-zero digit
 *
 * @return {number} return a digit
 */
export const nonZeroDigit = () => {
  return classes.range([ranges.NONZERO_DIGITS])
}

/**
 * Return a unicode space-character
 *
 * @return {number} return a character
 */
export const space = () => {
  return classes.range(rangeSets.SPACES)
}

/**
 * Return a literal character or character sequence
 *
 * @return {number} the provided data
 */
export const literal = (str:string):Generator => {
  return () => str
}

/**
 * Any non-line break character
 *
 * @return {number} return a character
 */
export const nonLineBreak = () => {
  return classes.notOneOf(['\n'])
}
