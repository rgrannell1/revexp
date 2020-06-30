
const random = require('./random')
const distributions = require('./distributions')

const quantifiers = {}

/**
 * Repeat a generator zero or more times
 *
 * @param {function} gen a generator function
 * @param {Object} opts
 *
 * @return {string} a string of repeated generator tokens
 */
quantifiers.zeroOrMoreRepeat = (gen, opts) => {
  if (typeof gen !== 'function') {
    throw new TypeError(`gen was not a function:\n+++\n${gen.toString()}\n+++\n`)
  }
  return () => {
    // -- todo factor out sample function.
    let count = distributions.uniform({ to: 256 })

    let word = ''

    for (let ith = 0; ith < count; ++ith) {
      word += gen()
    }
    return word
  }
}

/**
 * Repeat a generator one or more times
 *
 * @param {function} gen a generator function
 * @param {Object} opts
 *
 * @return {string} a string of repeated generator tokens
 */
quantifiers.oneOrMoreRepeat = (gen, opts = {to: 20}) => {
  return () => {
    // -- todo factor out sample function.
    let count = Math.floor(Math.random() * opts.to)
    let word = gen()

    for (let ith = 0; ith < count; ++ith) {
      word += gen()
    }

    return word
  }
}

/**
 * Repeat a generator an exact number of times
 *
 * @param {function} gen a generator function
 * @param {Object} opts
 *
 * @return {string} a string of repeated generator tokens
 */
quantifiers.exactlyRepeat = (gen, opts) => {
  return () => {
    let word = ''

    for (let ith = 0; ith < opts.count; ++ith) {
      word += gen()
    }

    return word
  }
}

quantifiers.rangeRepeat = (gen, opts) => {
  return () => ''
}

quantifiers.halfOpenRangeRepeat = (gen, opts) => {
  return () => ''
}

quantifiers.onceOrNone = (gen, opts) => {
  return random.coinFlip()
    ? gen
    : () => ''
}

quantifiers.repeat = (gen, opts) => {
  return () => {
    const repeatCount = Math.floor(Math.random() * (opts.to - opts.from)) + opts.from

    let word = ''

    for (let ith = 0; ith <= repeatCount; ++ith) {
      word += gen()
    }

    return word
  }
}

module.exports = quantifiers
