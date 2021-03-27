import * as random from './random.js';
import constants from './commons/constants.js';
/**
 * Select the result of one of a series of string-generators.
 *
 * @param gens an array of strings or thunks that return a string
 *
 * @returns a thunk that returns the result of one of the supplied generators
 */
export const oneOf = (gens) => {
    return () => random.oneOf(gens);
};
/**
 * Select a character not in a provided list of characters
 *
 * @param seqs an array of characters
 *
 * @returns a thunk that returns a character
 */
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
/**
 * An array of character-range arrays
 *
 * @param ranges an array of character
 *
 * @returns a thunk that returns a character in the specified ranges
 */
export const range = (ranges) => {
    return random.sample(ranges);
};
