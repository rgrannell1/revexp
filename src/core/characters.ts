
import RandExp from 'randexp'

import * as classes from './character-classes.js'
import constants from './commons/constants.js'

export const any = () => {
  return classes.range([constants.ranges.ALL_CHARS])
}

/**
 * Return a random digit
 *
 * @return {number} return a digit
 */
export const digit = () => {
  return classes.range([constants.ranges.DIGITS])
}

/**
 * Return a random non-zero digit
 *
 * @return {number} return a digit
 */
export const nonZeroDigit = () => {
  return classes.range([constants.ranges.NONZERO_DIGITS])
}

/**
 * Return a unicode space-character
 *
 * @return {number} return a character
 */
export const space = () => {
  return classes.range(constants.rangeSets.SPACES)
}

/**
 * Return a literal character or character sequence
 *
 * @return {number} the provided data
 */
export const literal = (str: string): () => string => {
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

/**
 * Return a literal character or character sequence
 *
 * @return {number} the provided data
 */
export const regexp = (re: RegExp): () => string => {
  const compiled = new RandExp(re)
  return () => {
    // -- for now, just delegate to RandExp (which seems like a good module).
    return compiled.gen()
  }
}
