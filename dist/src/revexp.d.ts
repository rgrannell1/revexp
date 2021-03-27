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
    firehose: (gen: () => string, ms: number) => Generator<string, void, unknown>;
};
export declare const jsonSpec: typeof jsonPkg;
export declare const builder: (spec: import("./core/commons/types.js").Spec, part: import("./core/commons/types.js").Config) => string;
export declare const parts: {
    oneOf: (gens: (string | (() => string))[]) => () => string | (() => string);
    notOneOf: (seqs: string[]) => () => string;
    range: (ranges: number[][]) => string;
    any: () => string;
    digit: () => string;
    nonZeroDigit: () => string;
    space: () => string;
    literal: (str: string) => () => string;
    nonLineBreak: () => () => string;
    regexp: (re: RegExp) => () => string;
    and: (ths: (string | (() => string))[]) => () => string;
    or: (ths: (string | (() => string))[]) => () => string;
    repeat: (th: string | (() => string), opts: import("./core/quantifiers.js").RepeatOpts) => () => string;
    optional: (th: string | (() => string)) => () => string;
    fromTemplate: (strings: TemplateStringsArray, ...keys: any) => () => string[];
};
