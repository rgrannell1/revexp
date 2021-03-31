import { Theory } from 'atypical';
import templateHypotheses from '../src/core/template.test.js';
import randomHypotheses from '../src/core/random.test.js';
import quantifierHypotheses from '../src/core/quantifiers.test.js';
const theory = new Theory({ description: 'all application hypotheses hold' });
theory
    .expectAll({
    ...templateHypotheses,
    ...randomHypotheses,
    ...quantifierHypotheses
})
    .test({
    seconds: 30
})
    .catch(err => {
    throw err;
});
