
export const range = (from:number, to:number):number => {
  return Math.floor(Math.random() * (to - from)) + from
}

interface SampleOpts {
  chars: string[] | undefined,
  ranges: number[][] | undefined
}

/**
 * return a random character.
 *
 * @param opts sample configuration.
 *
 * @return {string} a random character.
 */
export const sample = (opts:Partial<SampleOpts>) => {
  if (opts.chars) {
    return oneOf(opts.chars)
  } else if (opts.ranges) {
    const ith = Math.floor(Math.random() * opts.ranges.length)

    let [lower, upper] = opts.ranges[ith]
    if (typeof upper === 'undefined') {
      upper = lower + 1
    }

    return String.fromCharCode(range(lower, upper))
  } else {
    throw new Error('invalid options provided.')
  }
}

/**
 * Return a random boolean value
 *
 * @return {boolean} a true-false value
 */
export const coinFlip = () => {
  return oneOf([true, false])
}

export const oneOf = (elems:any) => {
  if (!elems || elems.length === 0) {
    throw new Error('no elements provided; cannot choose between them.')
  } else {
    const idx = Math.floor(Math.random() * elems.length)
    return elems[idx]
  }
}
