import { Hypothesis, Explanation } from 'atypical';
import { any } from './characters.js';
import { fromTemplate } from './template.js';
const fromTemplateHypothesis = new Hypothesis({ description: 'fromTemplate preserves content' })
    .cases(function* () {
    while (true) {
        yield [any()];
    }
})
    .always((str) => {
    const result = fromTemplate `${str}`();
    if (result !== str) {
        return new Explanation({
            description: 'mismatch between template input and output',
            data: {
                expected: str,
                got: result
            }
        });
    }
})
    .always((str) => {
    const result0 = fromTemplate `${() => str}-${() => str}`();
    const result1 = fromTemplate `${str}-${str}`();
    if (result0 !== result1) {
        return new Explanation({
            description: 'mismatch between string and thunk results for same source string',
            data: {
                expected: result0,
                got: result1
            }
        });
    }
});
export default {
    fromTemplateHypothesis
};
