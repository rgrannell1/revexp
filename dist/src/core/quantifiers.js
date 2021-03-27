import * as random from './random.js';
/**
 * Repeat the result of a generator and concatenate the results
 *
 * @param th a thunk that returns a string, or a string
 * @param opts an object with two fields:
 *   - from: a number, lower bound to repeat
 *   - to: a number, upper bound to repeat
 *
 * @returns a thunk that returns a string
 */
export const repeat = (th, opts) => {
    return () => {
        if (opts.from === 0 && opts.to === 0) {
            return '';
        }
        const repeatCount = opts.count
            ? opts.count - 1
            : random.range(opts.from, opts.to);
        let word = '';
        for (let ith = 0; ith <= repeatCount; ++ith) {
            word += typeof th === 'string' ? th : th();
        }
        return word;
    };
};
/**
 * Either return the result of a string generator, or an empty string
 *
 * @param th either a string or a thunk that returns a string
 *
 * @returns a thunk that returns a string
 */
export const optional = (th) => {
    return repeat(th, {
        from: 0,
        to: 1
    });
};
