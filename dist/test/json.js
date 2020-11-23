import tap from 'tap';
import tools from '../src/tools/index.js';
import builder from '../src/core/builder.js';
import * as jsonSpec from '../src/json/spec.js';
const summariseCases = (entry) => {
    return JSON.stringify(entry, null, 2);
};
const tests = {};
tests.jsonParses = (name, th) => {
    const failure = tools.shrink({
        test(str) {
            JSON.parse(str);
        },
        gen: th,
        until: tools.shrink.until.timeElapsed(2000),
        all: false
    });
    if (failure) {
        const message = 'expected zero failing cases\n\n:' + summariseCases(failure);
        throw new Error(message);
    }
    else {
        tap.pass('JSON parsed successfully.');
    }
};
const cases = [
    ['json.object', jsonSpec.object],
    ['json.string', jsonSpec.string],
    ['json.number', jsonSpec.number],
    ['json.exponent', jsonSpec.exponent],
    ['json.number', jsonSpec.number],
    ['json.array', jsonSpec.array],
    ['json.value', jsonSpec.value]
];
for (const [name, config] of cases) {
    tests.jsonParses(name, () => builder(jsonSpec, config));
}
