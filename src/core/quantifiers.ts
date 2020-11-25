
import * as random from './random.js'
import {
  Stringish
} from './commons/types'

export interface RepeatOpts {
  from?: number,
  to?: number,
  count?: number
}

export const repeat = (th: Stringish, opts: RepeatOpts) => {
  return () => {
    if (opts.from === 0 && opts.to === 0) {
      return ''
    }

    const repeatCount = opts.count
      ? opts.count - 1
      : random.range(opts.from as any, opts.to as any)
    let word = ''

    for (let ith = 0; ith <= repeatCount; ++ith) {
      word += typeof th === 'string' ? th : th()
    }

    return word
  }
}
