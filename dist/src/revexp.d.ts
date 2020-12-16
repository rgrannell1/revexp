import * as jsonPkg from './json/spec.js';
export declare const tools: {
    diff: (str0: string, str1: string) => void;
    evolve: ({ test, str, until }: import("./tools/evolve.js").EvolveOpts) => {
        invalid: string;
        valid: string;
    };
    shrink: {
        ({ test, gen, all, until }: import("./tools/shrink.js").ShrinkOpts): never[] | null;
        until: {
            count: (target: number) => (count: number) => boolean;
            timeElapsed: (target: number) => (count: number, start: number) => boolean;
        };
    };
    firehose: (gen: Function, seconds: number) => Generator<any, void, unknown>;
};
export declare const jsonSpec: typeof jsonPkg;
export declare const builder: (spec: import("./core/commons/types.js").Spec, part: import("./core/commons/types.js").Config) => string;
export declare const parts: {
    oneOf: (gens: import("./core/commons/types.js").Stringish[]) => () => import("./core/commons/types.js").Stringish;
    notOneOf: (seqs: string[]) => () => string;
    range: (ranges: number[][]) => string;
    any: () => string;
    digit: () => string;
    nonZeroDigit: () => string;
    space: () => string;
    literal: (str: string) => import("./core/commons/types.js").StringThunk;
    nonLineBreak: () => () => string;
    regexp: (re: RegExp) => import("./core/commons/types.js").StringThunk;
    and: (ths: import("./core/commons/types.js").Stringish[]) => () => string;
    or: (ths: import("./core/commons/types.js").Stringish[]) => import("./core/commons/types.js").StringThunk;
    repeat: (th: import("./core/commons/types.js").Stringish, opts: import("./core/quantifiers.js").RepeatOpts) => () => string;
};
