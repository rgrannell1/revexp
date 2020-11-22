
import * as random from './random'
import {
  StringThunk
} from './core/commons/types'

interface RepeatOpts {
  from: number,
  to: number
}

export const repeat = (th: StringThunk, opts: RepeatOpts) => {
  return () => {
    if (opts.from === 0 && opts.to === 0) {
      return ''
    }

    const repeatCount = random.range(opts.from, opts.to)
    let word = ''

    for (let ith = 0; ith <= repeatCount; ++ith) {
      word += th()
    }

    return word
  }
}
