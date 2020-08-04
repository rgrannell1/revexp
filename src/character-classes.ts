
import { ranges } from './commons/constants'
import * as random from './random'

import {
  Generator,
  GeneratorThunk
} from './types'

// -- get your game on.

/**
 * Return one of the provided generators
 *
 * @param {Array<Object>} gens
 */
export const oneOf = (gens:Array<Generator | string>):GeneratorThunk => {
  return () => random.oneOf(gens)
}

/**
 * Return characters not in a list of characters.
 *
 * @param {num} opts.from
 * @param {num} opts.to
 *
 *
 */
export const notOneOf = (seqs:string[]) => {
  return () => {
    let char = range([ranges.ALL_CHARS])

    while (true) {
      // -- update char until one that isn't in seqs is created
      // -- potentially non-terminating.
      if (seqs.includes(char)) {
        char = range([ranges.ALL_CHARS])
      } else {
        break
      }
    }

    return char
  }
}

/**
 * Return characters in a range
 *
 * @param {num} opts.from
 * @param {num} opts.to
 *
 *
 */
export const range = (ranges:number[][]) => {
  return random.sample({ ranges })
}
