declare const firehose: (gen: () => string, ms: number) => Generator<string, void, unknown>;
export default firehose;
