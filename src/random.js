
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
    return random.oneOf(opts.chars)
  } else if (opts.ranges) {
    if (!opts?.ranges?.length > 0) {
      throw new Error('ranges should have one or more elements.')
    }

    const ith = Math.floor(Math.random() * opts.ranges.length)
    const range = opts.ranges[ith]

    let [lower, upper] = range
    if (typeof upper === 'undefined') {
      upper = lower + 1
    }

    return String.fromCharCode(random.range(lower, upper))
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
  if (!elems || elems.length === 0) {
    return undefined
  } else {
    const idx = Math.floor(Math.random() * elems.length)
    return elems[idx]
  }
}

random.range = (from, to) => {
  return Math.floor(Math.random() * (to - from)) + from
}

module.exports = random
