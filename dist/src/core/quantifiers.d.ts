export interface RepeatOpts {
    from?: number;
    to?: number;
    count?: number;
}
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
export declare const repeat: (th: (string | (() => string)), opts: RepeatOpts) => () => string;
/**
 * Either return the result of a string generator, or an empty string
 *
 * @param th either a string or a thunk that returns a string
 *
 * @returns a thunk that returns a string
 */
export declare const optional: (th: (string | (() => string))) => () => string;
