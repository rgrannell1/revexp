import { Hypothesis, Explanation } from 'atypical';
import { any, digit } from './characters.js';
import { and, or } from './logic.js';
import { repeat } from './quantifiers.js';
const orSingleHypothesis = new Hypothesis({ description: 'or handles strings and thunks equally (length-one)' })
    .cases(function* () {
    while (true) {
        yield [any()];
    }
})
    .always((char) => {
    const result0 = or([char])();
    const result1 = or([() => char])();
    if (result0 !== result1) {
        return new Explanation({
            description: 'results do not match',
            data: {
                result0,
                result1
            }
        });
    }
    if (result0 !== char) {
        return new Explanation({
            description: 'result not equal character',
            data: {
                result0,
                result1,
                char
            }
        });
    }
});
const orMultipleHypothesis = new Hypothesis({ description: 'or returns entries from a set' })
    .cases(function* () {
    while (true) {
        const entries = repeat(digit, { count: Math.floor(Math.random() * 10) + 1 })();
        yield [entries];
    }
})
    .always((entries) => {
    const set = new Set(entries);
    const result = or(entries)();
    if (!set.has(result)) {
        return new Explanation({
            description: 'invalid entry returned',
            data: { result, entries }
        });
    }
});
const andSingleHypothesis = new Hypothesis({ description: 'or handles strings and thunks equally (length-one)' })
    .cases(function* () {
    while (true) {
        yield [any()];
    }
})
    .always((char) => {
    const result0 = and([char])();
    const result1 = and([() => char])();
    if (result0 !== result1) {
        return new Explanation({
            description: 'results do not match',
            data: {
                result0,
                result1
            }
        });
    }
    if (result0 !== char) {
        return new Explanation({
            description: 'result not equal character',
            data: {
                result0,
                result1,
                char
            }
        });
    }
});
const andMultipleHypothesis = new Hypothesis({ description: 'and returns joined data' })
    .cases(function* () {
    while (true) {
        const entries = repeat(any, { count: Math.floor(Math.random() * 10) + 1 })();
        yield [entries.split('')];
    }
})
    .always((entries) => {
    const result = and(entries)();
    const expected = entries.join('');
    if (result !== expected) {
        return new Explanation({
            description: 'cases not equal',
            data: { result, expected }
        });
    }
});
export default {
    orSingleHypothesis,
    orMultipleHypothesis,
    andSingleHypothesis,
    andMultipleHypothesis
};
