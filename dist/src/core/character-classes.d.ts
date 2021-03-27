/**
 * Select the result of one of a series of string-generators.
 *
 * @param gens an array of strings or thunks that return a string
 *
 * @returns a thunk that returns the result of one of the supplied generators
 */
export declare const oneOf: (gens: (string | (() => string))[]) => () => (string | (() => string));
/**
 * Select a character not in a provided list of characters
 *
 * @param seqs an array of characters
 *
 * @returns a thunk that returns a character
 */
export declare const notOneOf: (seqs: string[]) => () => string;
/**
 * An array of character-range arrays
 *
 * @param ranges an array of character
 *
 * @returns a thunk that returns a character in the specified ranges
 */
export declare const range: (ranges: number[][]) => string;
