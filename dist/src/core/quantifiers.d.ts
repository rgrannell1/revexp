import { StringThunk } from './commons/types';
export interface RepeatOpts {
    from: number;
    to: number;
}
export declare const repeat: (th: StringThunk, opts: RepeatOpts) => () => string;
