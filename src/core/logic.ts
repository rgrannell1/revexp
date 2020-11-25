
import * as random from './random.js'

import {
  Stringish
} from './commons/types'

export const or = (ths: Stringish[]) => {
  const res = random.oneOf(ths)

  return typeof res === 'string'
    ? () => res
    : res
}

export const and = (ths: Stringish[]) => {
  return () => ths.map(th => {
    return typeof th === 'string'
      ? th
      : th()
  }).join('')
}