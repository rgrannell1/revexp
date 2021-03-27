/**
 * Select a random value from an array.
 *
 * @param elems an array of elements
 *
 * @returns an element from the array
 */
export declare const oneOf: <I>(elems: I[]) => I;
/**
 * Return a random integer in a range
 *
 * @param from lower bound
 * @param to upper bound
 *
 * @returns a number in the bounded range
 */
export declare const range: (from: number, to: number) => number;
/**
 * Return a random character in the provided numeric ranges
 *
 * @param ranges an array of character ranges
 *
 * @returns a randomly selected character
 */
export declare const sample: (ranges: number[][]) => string;
/**
 * Returns a random boolean variable
 *
 * @returns a boolean
 */
export declare const coinFlip: () => boolean;
