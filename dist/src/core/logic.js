import * as random from './random.js';
export const or = (ths) => {
    return random.oneOf(ths);
};
export const and = (ths) => {
    return () => ths.map(th => th()).join('');
};
