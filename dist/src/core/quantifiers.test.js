import { Hypothesis, Explanation } from 'atypical';
import { any } from './characters.js';
import { optional, repeat } from './quantifiers.js';
const optionalHypothesis = new Hypothesis({ description: 'optional returns a length zero or one result' })
    .cases(function* () {
    while (true) {
        yield [any()];
    }
})
    .always((char) => {
    const result = optional(char);
    if (result.length > 1) {
        return new Explanation({
            description: 'expected a maximum length of one',
            data: {
                result
            }
        });
    }
});
const repeatEqualHypothesis = new Hypothesis({ description: 'repeating when to and from are the same returns the right count' })
    .cases(function* () {
    while (true) {
        yield [any(), Math.floor(Math.random() * 100)];
    }
})
    .always((char, lower) => {
    const result = repeat(char, {
        from: lower,
        to: lower
    })();
    if (result.length !== lower) {
        return new Explanation({
            description: 'unexpected length',
            data: {
                result,
                length: result.length,
                expectedLength: lower
            }
        });
    }
});
const repeatBoundsHypothesis = new Hypothesis({ description: 'repeating includes values in the correct bounds' })
    .cases(function* () {
    while (true) {
        const lower = Math.floor(Math.random() * 100);
        yield [any(), lower, lower + Math.floor(Math.random() * 100)];
    }
})
    .always((char, lower, upper) => {
    const result = repeat(char, {
        from: lower,
        to: upper
    })();
    if (result.length < lower || result.length > upper) {
        return new Explanation({
            description: 'unexpected length',
            data: {
                result,
                length: result.length,
                lower,
                upper
            }
        });
    }
});
const repeatCountHypothesis = new Hypothesis({ description: 'repeating with count create a string of that length' })
    .cases(function* () {
    while (true) {
        const count = Math.floor(Math.random() * 100);
        yield [any(), count];
    }
})
    .always((char, count) => {
    const result = repeat(char, { count })();
    if (result.length !== count) {
        return new Explanation({
            description: 'unexpected length',
            data: {
                result,
                length: result.length,
                count
            }
        });
    }
});
export default {
    optionalHypothesis,
    repeatEqualHypothesis,
    repeatBoundsHypothesis,
    repeatCountHypothesis
};
