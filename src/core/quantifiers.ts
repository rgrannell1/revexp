
import * as random from './random.js'

export interface RepeatOpts {
  from?: number,
  to?: number,
  count?: number
}

/**
 * Repeat the result of a generator and concatenate the results
 *
 * @param th a thunk that returns a string, or a string
 * @param opts an object with two fields:
 *   - from: a number, lower bound to repeat
 *   - to: a number, upper bound to repeat
 *
 * @returns a thunk that returns a string
 */
export const repeat = (th: (string | (() => string)), opts: RepeatOpts): () => string => {
  return () => {
    if (opts.from === 0 && opts.to === 0) {
      return ''
    } else if (opts.from === opts.to && typeof opts.from !== 'undefined') {
      return repeat(th, { count: opts.from })()
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

/**
 * Either return the result of a string generator, or an empty string
 *
 * @param th either a string or a thunk that returns a string
 *
 * @returns a thunk that returns a string
 */
export const optional = (th: (string | (() => string))) => {
  return repeat(th, {
    from: 0,
    to: 1
  })
}
