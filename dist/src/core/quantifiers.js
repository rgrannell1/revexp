import * as random from './random.js';
export const repeat = (th, opts) => {
    return () => {
        if (opts.from === 0 && opts.to === 0) {
            return '';
        }
        const repeatCount = random.range(opts.from, opts.to);
        let word = '';
        for (let ith = 0; ith <= repeatCount; ++ith) {
            word += th();
        }
        return word;
    };
};
