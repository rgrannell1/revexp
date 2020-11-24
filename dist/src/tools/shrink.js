const handleError = ({ all, state, candidates }) => {
    const minCandidate = candidates.reduce((min, current) => {
        return current.length < min.length
            ? current
            : min;
    });
    if (state.min === null || minCandidate.length < state.min.length) {
        state.min = minCandidate;
    }
    if (all) {
        state.sequence.push(minCandidate);
    }
};
const shrink = ({ test, gen, all, until }) => {
    const startTime = Date.now();
    const state = {
        count: 0,
        min: null,
        sequence: []
    };
    while (true) {
        state.count++;
        const newGen = gen();
        try {
            const result = test(newGen);
            if (result === false) {
                throw new Error(`${newGen} failed test.`);
            }
        }
        catch (err) {
            handleError({
                state,
                all,
                candidates: [newGen]
            });
        }
        if (until(state.count, startTime)) {
            return all
                ? state.sequence
                : state.min;
        }
    }
};
shrink.until = {
    count: (target) => (count) => {
        return count >= target;
    },
    timeElapsed: (target) => (count, start) => {
        return Date.now() >= (start + target);
    }
};
export default shrink;
