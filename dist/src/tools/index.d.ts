/**
 * Display a character diff
 *
 * @param {*} str0
 * @param {*} str1
 */
export declare const diff: (str0: string, str1: string) => void;
export declare const evolve: ({ test, str, until }: import("./evolve.js").EvolveOpts) => {
    invalid: string;
    valid: string;
};
export declare const shrink: {
    ({ test, gen, all, until }: import("./shrink.js").ShrinkOpts): never[] | null;
    until: {
        count: (target: number) => (count: number) => boolean;
        timeElapsed: (target: number) => (count: number, start: number) => boolean;
    };
};
export declare const firehose: (seconds: number) => Generator<number, void, unknown>;
