import tap from 'tap';
import * as revexp from '../src/revexp.js';
const summariseCases = (entry) => {
    return JSON.stringify(entry, null, 2);
};
const tests = {};
tests.jsonParses = (name, th) => {
    const failure = revexp.tools.shrink({
        test(str) {
            JSON.parse(str);
        },
        gen: th,
        until: revexp.tools.shrink.until.timeElapsed(20000),
        all: false
    });
    if (failure) {
        const message = 'expected zero failing cases\n\n:' + summariseCases(failure);
        throw new Error(message);
    }
    else {
        tap.pass(`${name} JSON parsed successfully.`);
    }
};
const cases = [
    ['json.object', revexp.jsonSpec.object],
    ['json.string', revexp.jsonSpec.string],
    ['json.number', revexp.jsonSpec.number],
    ['json.exponent', revexp.jsonSpec.exponent],
    ['json.number', revexp.jsonSpec.number],
    ['json.array', revexp.jsonSpec.array],
    ['json.value', revexp.jsonSpec.value]
];
for (const [name, config] of cases) {
    tests.jsonParses(name, () => revexp.builder(revexp.jsonSpec, config));
}
