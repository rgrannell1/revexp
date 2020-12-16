const firehose = function* (gen, ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
        yield gen();
    }
};
export default firehose;
