
const random = {}

/**
 * return a random character.
 *
 * @param opts sample configuration.
 *
 * @return {string} a random character.
 */
random.sample = opts => {
  if (opts.chars) {
    const idx = Math.floor(Math.random() * opts.chars.length)

    return opts.chars[idx]
  } else if (opts.ranges) {
    const ith = Math.floor(Math.random() * opts.ranges.length)

    const range = opts.ranges[ith]

    let [lower, upper] = range
    if (typeof upper === 'undefined') {
      upper = lower + 1
    }
    const idx = Math.floor(Math.random() * (upper - lower)) + lower

    return String.fromCharCode(idx)
  } else {
    throw new Error('invalid options provided.')
  }
}

/**
 * Return a random boolean value
 *
 * @return {boolean} a true-false value
 */
random.coinFlip = () => {
  return random.oneOf([true, false])
}

random.oneOf = elems => {
  if (!elems) {
    return undefined
  } else {
    const idx = Math.floor(Math.random() * elems.length)
    return elems[idx]
  }
}

module.exports = random
