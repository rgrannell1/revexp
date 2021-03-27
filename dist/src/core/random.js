/**
 * Select a random value from an array.
 *
 * @param elems an array of elements
 *
 * @returns an element from the array
 */
export const oneOf = (elems) => {
    if (!elems || elems.length === 0) {
        throw new Error('no elements provided; cannot choose between options.');
    }
    else {
        const idx = Math.floor(Math.random() * elems.length);
        return elems[idx];
    }
};
/**
 * Return a random integer in a range
 *
 * @param from lower bound
 * @param to upper bound
 *
 * @returns a number in the bounded range
 */
export const range = (from, to) => {
    return Math.floor(Math.random() * (to - from)) + from;
};
/**
 * Return a random character in the provided numeric ranges
 *
 * @param ranges an array of character ranges
 *
 * @returns a randomly selected character
 */
export const sample = (ranges) => {
    const idx = Math.floor(Math.random() * ranges.length);
    let [lower, upper] = ranges[idx];
    if (typeof upper === 'undefined') {
        upper = lower + 1;
    }
    return String.fromCharCode(range(lower, upper));
};
/**
 * Returns a random boolean variable
 *
 * @returns a boolean
 */
export const coinFlip = () => {
    return Math.random() >= 0.5;
};
