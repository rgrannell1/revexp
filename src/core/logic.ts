
import * as random from './random.js'

export const or = (ths: Array<string | (() => string)>): (() => string) => {
  const res = random.oneOf(ths)

  return typeof res === 'string'
    ? () => res
    : res
}

export const and = (ths: Array<string | (() => string)>): (() => string) => {
  return () => ths.map(th => {
    return typeof th === 'string'
      ? th
      : th()
  }).join('')
}
