
import { Hypothesis, Explanation } from 'atypical'
import { any, digit, literal, nonZeroDigit } from './characters.js'

const digitHypothesis = new Hypothesis({ description: 'digit produces all digits' })
  .cases(function * () {
    while (true) {
      yield [digit()]
    }
  })
  .always((char: string) => {
    const digits = new Set('0123456789'.split(''))

    if (!digits.has(char)) {
      return new Explanation({
        description: 'non-digit returned',
        data: {
          char
        }
      })
    }
  })

const nonZeroDigitHypothesis = new Hypothesis({ description: 'digit produces all digits' })
  .cases(function * () {
    while (true) {
      yield [nonZeroDigit()]
    }
  })
  .always((char: string) => {
    const digits = new Set('123456789'.split(''))

    if (!digits.has(char)) {
      return new Explanation({
        description: 'non-digit returned',
        data: {
          char
        }
      })
    }
  })

const literalHypothesis = new Hypothesis({ description: 'digit produces all digits' })
  .cases(function * () {
    while (true) {
      yield [any()]
    }
  })
  .always((char: string) => {
    const result = literal(char)()

    if (result !== char) {
      return new Explanation({
        description: 'literal returned invalid data',
        data: {
          result,
          char
        }
      })
    }
  })

export default {
  digitHypothesis,
  nonZeroDigitHypothesis,
  literalHypothesis
}
