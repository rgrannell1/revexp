import { Stringish } from './commons/types';
export declare const oneOf: (gens: Stringish[]) => () => Stringish;
export declare const notOneOf: (seqs: string[]) => () => string;
export declare const range: (ranges: number[][]) => string;
