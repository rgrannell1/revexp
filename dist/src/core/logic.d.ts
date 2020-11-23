import { StringThunk } from './commons/types';
export declare const or: (ths: StringThunk[]) => StringThunk;
export declare const and: (ths: StringThunk[]) => () => string;
