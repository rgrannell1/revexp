import { Stringish } from './commons/types';
export interface RepeatOpts {
    from?: number;
    to?: number;
    count?: number;
}
export declare const repeat: (th: Stringish, opts: RepeatOpts) => () => string;
