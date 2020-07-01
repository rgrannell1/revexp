
const tap = require('tap')
const iface = require('../src/interface')
const random = require('../src/random')

const tests = {}

const repeat = (fn, num) => {
  for (let ith = 0; ith < num; ++ith) {
    fn()
  }
}

tests.range = () => {
  const cases = [
    [+1, +1, new Set([1])],
    [-1, +1, new Set([-1, 0, 1])]
  ]

  for (const [from, to, set] of cases) {
    repeat(() => {
      const result = random.range(1, 1)
      if (!set.has(result)) {
        throw new Error(`returned invalid result: ${result} was not in ${[...set]}`)
      }
    }, 10000)

    tap.pass(`range ${from}...${to} tests passed`)
  }
}

tests.oneOf = () => {
  for (const tcase of [[], undefined]) {
    if (typeof random.oneOf(tcase) !== 'undefined') {
      throw new Error('oneOf should return undefined when no input provided')
    }
  }

  const cases = [
    new Set([0]),
    new Set([0, 1]),
    new Set([0, 1, 3])
  ]

  repeat(() => {
    for (tcase of cases) {
      const elem = random.oneOf([...tcase])

      if (!tcase.has(elem)) {
        throw new Error(`${elem} not in ${[...tcase]}`)
      }
    }
  }, 10000)
}

tests.coinFlip = () => {
  repeat(() => {
    let result = random.coinFlip()

    if (result !== true && result !== false) {
      throw new Error(`non-boolean result ${result} from random.coinFlip()`)
    }
  }, 10000)
}

tests.sample = () => {
  if (typeof random.sample({chars: []}) !== 'undefined') {
    throw new Error('sample should return undefined when no input provided')
  }

  try {
    random.sample({})
  } catch (err) {
    tap.pass('sample threw error for invalid config.')
  }

  const testChars = [
    new Set(['a']),
    new Set(['a', 'b']),
    new Set(['a', 'b', 'c'])
  ]

  try {
    random.sample({ ranges: [] })
  } catch (err) {
    tap.pass('sample threw error for invalid config.')
  }

  for (const chars of testChars) {
    const result = random.sample({ chars: [...chars] })

    if (!chars.has(result)) {
      throw new Error(`${elem} in ${[...chars]}`)
    }
  }

  repeat(() => {
    const sample0 = random.sample({ ranges: [[0]] })
    const sample1 = random.sample({ ranges: [[0, 1]] })

    if (sample0 !== sample1) {
      throw new Error(`${sample0} was not equal to ${sample1}.`)
    }
  }, 10_000)
}

tests.range()
tests.oneOf()
tests.coinFlip()
tests.sample()
