/**
 * Create a generator from a template string.
 *
 * @param strings
 * @param keys
 */
export const fromTemplate = (strings, ...keys) => {
    return () => {
        const result = [strings[0]];
        keys.forEach((key, ith) => {
            const evalled = typeof key === 'function'
                ? key()
                : key;
            result.push(evalled, strings[ith + 1]);
        });
        return result.join('');
    };
};
