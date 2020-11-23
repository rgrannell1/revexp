import * as random from './random.js';
import constants from './commons/constants.js';
export const oneOf = (gens) => {
    return () => random.oneOf(gens);
};
export const notOneOf = (seqs) => {
    return () => {
        let char = range([constants.ranges.ALL_CHARS]);
        while (true) {
            if (seqs.includes(char)) {
                char = range([constants.ranges.ALL_CHARS]);
            }
            else {
                break;
            }
        }
        return char;
    };
};
export const range = (ranges) => {
    return random.sample(ranges);
};
