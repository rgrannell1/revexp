
import * as random from './random.js'
import constants from './commons/constants.js'
import {
  Stringish
} from './commons/types'

export const oneOf = (gens: Stringish[]): () => Stringish => {
  return () => random.oneOf(gens)
}

export const notOneOf = (seqs:string[]) => {
  return () => {
    let char = range([constants.ranges.ALL_CHARS])

    while (true) {
      if (seqs.includes(char)) {
        char = range([constants.ranges.ALL_CHARS])
      } else {
        break
      }
    }

    return char
  }
}

export const range = (ranges:number[][]) => {
  return random.sample(ranges)
}
