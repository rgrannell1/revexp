
import * as random from './random'

import {
  Generator
} from './types'

interface RepeatOpts {
  from: number
  to: number
}

export const repeat = (gen:Generator, opts:RepeatOpts) => {
  return () => {
    if (opts.from === 0 && opts.to === 0) {
      return ''
    }

    const repeatCount = random.range(opts.from, opts.to)
    let word = ''

    for (let ith = 0; ith <= repeatCount; ++ith) {
      word += gen()
    }

    return word
  }
}
