
import * as random from './random.js'

export const or = (ths: (string | (() => string))[]) => {
  const res = random.oneOf(ths)

  return typeof res === 'string'
    ? () => res
    : res
}

export const and = (ths: (string | (() => string))[]) => {
  return () => ths.map(th => {
    return typeof th === 'string'
      ? th
      : th()
  }).join('')
}