/**
 * Return a slightly modifier string.
 *
 * @param str
 *
 */
export declare const mutateString: (str: string) => string;
export interface EvolveOpts {
    test: Function;
    str: string;
    until: Function;
}
/**
 * Find a mutant that satisfies a test.
 *
 * @param param0
 */
declare const evolve: ({ test, str, until }: EvolveOpts) => {
    invalid: string;
    valid: string;
};
export default evolve;
