
import { Theory } from 'atypical'

import templateHypotheses from '../src/core/template.test.js'
import randomHypotheses from '../src/core/random.test.js'
import quantifierHypotheses from '../src/core/quantifiers.test.js'
import logicHypotheses from '../src/core/logic.test.js'
import charactersHypotheses from '../src/core/characters.test.js'

const theory = new Theory({ description: 'all application hypotheses hold' })

theory
  .expectAll({
    ...templateHypotheses,
    ...randomHypotheses,
    ...quantifierHypotheses,
    ...logicHypotheses,
    ...charactersHypotheses
  })
  .test({
    seconds: 30
  })
  .catch(err => {
    throw err
  })
