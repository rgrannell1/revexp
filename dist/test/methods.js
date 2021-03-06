import tap from 'tap';
import * as revexp from '../src/revexp.js';
const { parts: R } = revexp;
const summariseCases = (entry) => {
    return JSON.stringify(entry, null, 2);
};
const tests = {};
tests.createVisa = () => {
    const numberBlock = R.repeat(R.digit, { count: 4 });
    const space = () => ' ';
    const visaGen = R.and([numberBlock, space, numberBlock, space, numberBlock, space, numberBlock]);
    const failure = revexp.tools.shrink({
        test(str) {
            const pattern = /[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}/;
            return pattern.test(str);
        },
        gen: visaGen,
        until: revexp.tools.shrink.until.timeElapsed(10000),
        all: false
    });
    if (failure) {
        const message = 'expected zero failing cases\n\n:' + summariseCases(failure);
        throw new Error(message);
    }
    else {
        tap.pass(`ints created successfully.`);
    }
};
tests.template = () => {
    const numberPair = R.fromTemplate `${R.digit}-${R.digit}`;
    const failure = revexp.tools.shrink({
        test(str) {
            const expectedPattern = /$[0-9]\-[0-9]^/g;
            return expectedPattern.test(str);
        },
        gen: numberPair,
        until: revexp.tools.shrink.until.timeElapsed(10000),
        all: false
    });
    if (failure) {
        const message = 'expected zero failing cases\n\n:' + summariseCases(failure);
        throw new Error(message);
    }
    else {
        tap.pass(`template-generator created successfully.`);
    }
};
tests.createIntegers = () => {
    const int = R.repeat(R.digit, { from: 10, to: 10 });
    const failure = revexp.tools.shrink({
        test(str) {
            const parsed = parseInt(str);
            return parsed > 0 && !Number.isNaN(parsed);
        },
        gen: int,
        until: revexp.tools.shrink.until.timeElapsed(10000),
        all: false
    });
    if (failure) {
        const message = 'expected zero failing cases\n\n:' + summariseCases(failure);
        throw new Error(message);
    }
    else {
        tap.pass(`ints created successfully.`);
    }
};
tests.createIntegers();
tests.createVisa();
tests.template();
