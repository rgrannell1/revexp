const firehose = function* (seconds) {
    const start = Date.now();
    while (Date.now() - start > seconds) {
        yield start;
    }
};
export default firehose;
