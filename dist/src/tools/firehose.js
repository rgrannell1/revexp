const firehose = function* (gen, seconds) {
    const start = Date.now();
    while (Date.now() - start > seconds) {
        yield gen();
    }
};
export default firehose;
