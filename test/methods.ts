
import tap from 'tap'
import * as revexp from '../src/revexp.js'
const { parts: R } = revexp

const summariseCases = <I>(entry: I) => {
  return JSON.stringify(entry, null, 2)
}

interface Tests {
  [key: string]: () => void
}

const tests: Tests = {}

tests.createIntegers = () => {
  const int = R.repeat(R.digit, { from: 10, to: 10 })

  const failure = revexp.tools.shrink({
    test(str: string) {
      const parsed = parseInt(str)

      return parsed > 0 && !Number.isNaN(parsed)
    },
    gen: int,
    until: revexp.tools.shrink.until.timeElapsed(10_000),
    all: false
  })

  if (failure) {
    const message = 'expected zero failing cases\n\n:' + summariseCases(failure)
    throw new Error(message)
  } else {
    tap.pass(`ints created successfully.`)
  }
}

tests.createIntegers()
