import * as jsonPkg from './dist/src/json/spec.js';
export declare const tools: {
    diff: (str0: string, str1: string) => void;
    evolve: ({ test, str, until }: import("./dist/src/tools/evolve.js").EvolveOpts) => {
        invalid: string;
        valid: string;
    };
    shrink: {
        ({ test, gen, all, until }: import("./dist/src/tools/shrink.js").ShrinkOpts): never[] | null;
        until: {
            count: (target: number) => (count: number) => boolean;
            timeElapsed: (target: number) => (count: number, start: number) => boolean;
        };
    };
};
export declare const jsonSpec: typeof jsonPkg;
export declare const builder: (spec: import("./dist/src/core/commons/types.js").Spec, part: import("./dist/src/core/commons/types.js").Config) => string;
export declare const parts: {
    oneOf: (gens: import("./dist/src/core/commons/types.js").Stringish[]) => () => import("./dist/src/core/commons/types.js").Stringish;
    notOneOf: (seqs: string[]) => () => string;
    range: (ranges: number[][]) => string;
    any: () => string;
    digit: () => string;
    nonZeroDigit: () => string;
    space: () => string;
    literal: (str: string) => import("./dist/src/core/commons/types.js").StringThunk;
    nonLineBreak: () => () => string;
    regexp: (re: RegExp) => import("./dist/src/core/commons/types.js").StringThunk;
    and: (ths: import("./dist/src/core/commons/types.js").Stringish[]) => () => string;
    or: (ths: import("./dist/src/core/commons/types.js").Stringish[]) => import("./dist/src/core/commons/types.js").StringThunk;
    repeat: (th: import("./dist/src/core/commons/types.js").Stringish, opts: import("./dist/src/core/quantifiers.js").RepeatOpts) => () => string;
};
