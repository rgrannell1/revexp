import { StringThunk } from '../core/commons/types';
declare const firehose: (gen: StringThunk, ms: number) => Generator<string, void, unknown>;
export default firehose;
