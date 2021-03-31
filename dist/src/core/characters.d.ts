export declare const any: () => string;
/**
 * Return a random digit
 *
 * @return {number} return a digit
 */
export declare const digit: () => string;
/**
 * Return a random non-zero digit
 *
 * @return {number} return a digit
 */
export declare const nonZeroDigit: () => string;
/**
 * Return a unicode space-character
 *
 * @return {number} return a character
 */
export declare const space: () => string;
/**
 * Return a literal character or character sequence
 *
 * @return {number} the provided data
 */
export declare const literal: (str: string) => () => string;
/**
 * Any non-line break character
 *
 * @return {number} return a character
 */
export declare const nonLineBreak: () => string;
/**
 * Return a literal character or character sequence
 *
 * @return {number} the provided data
 */
export declare const regexp: (re: RegExp) => () => string;
