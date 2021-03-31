
import { Hypothesis, Explanation } from 'atypical'
import { coinFlip, range } from './random.js'

const coinFlipHypothesis = new Hypothesis({ description: 'coinflip produces booleans' })
  .cases(function* () {
    while (true) {
      yield []
    }
  })
  .always(() => {
    const result = coinFlip()

    if (result !== true && result !== false) {
      return new Explanation({
        description: 'coinflip is broken',
        data: {
          got: result
        }
      })
    }
  })

const rangeHypothesis = new Hypothesis({ description: 'range returns numbers in bounds' })
  .cases(function* () {
    while (true) {
      const lower = Math.floor(Math.random() * 100)
      const upper = lower + Math.floor(Math.random() * 100)

      yield [lower, upper]
    }
  })
  .always((lower: number, upper: number) => {
    const result = range(lower, upper)

    if (result < lower || result > upper) {
      return new Explanation({
        description: 'invalid range bounds returned',
        data: {
          lower,
          upper,
          result
        }
      })
    }
  })

export default {
  coinFlipHypothesis,
  rangeHypothesis
}
