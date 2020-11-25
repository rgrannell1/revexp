import * as random from './random.js';
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
