import * as random from "../core/random.js";
import * as characters from "../core/characters.js";
import * as classes from "../core/character-classes.js";
const every = (stack, part) => {
    stack.push(...part.every);
};
const isEvery = (candidate) => {
    return candidate && candidate.hasOwnProperty('every');
};
const digit = (stack, part) => {
    const item = part.digit.zero
        ? characters.digit()
        : characters.nonZeroDigit();
    stack.push(item);
};
const isDigit = (candidate) => {
    return candidate && candidate.hasOwnProperty('digit');
};
const isRepeat = (candidate) => {
    return candidate && candidate.hasOwnProperty('repeat');
};
const isNotOneOf = (candidate) => {
    return candidate && candidate.hasOwnProperty('notOneOf');
};
const isOneOf = (candidate) => {
    return candidate && candidate.hasOwnProperty('oneOf');
};
const isOptional = (candidate) => {
    return candidate && candidate.hasOwnProperty('optional');
};
const isRef = (candidate) => {
    return candidate && candidate.hasOwnProperty('ref');
};
const repeat = (stack, part) => {
    if (typeof part.repeat.from === 'undefined' && typeof part.repeat.to === 'undefined') {
        return;
    }
    if (part.repeat.from === 0 && part.repeat.to === 0) {
        return;
    }
    const repeatCount = random.range(part.repeat.from || 0, part.repeat.to || 256);
    for (let ith = 0; ith <= repeatCount; ++ith) {
        stack.push(part.repeat.value);
    }
};
const notOneOf = (stack, part) => {
    const item = classes.notOneOf(part.notOneOf)();
    stack.push(item);
};
const oneOf = (stack, part) => {
    stack.push(random.oneOf(part.oneOf));
};
const optional = (stack, part) => {
    if (random.coinFlip()) {
        stack.push(part.optional);
    }
};
const ref = (spec, stack, part) => {
    stack.push(spec[part.ref]);
};
const load = (spec, part) => {
    const stack = [part];
    const parts = [];
    while (stack.length > 0) {
        const item = stack.pop();
        if (isDigit(item)) {
            digit(stack, item);
        }
        else if (isEvery(item)) {
            every(stack, item);
        }
        else if (isRepeat(item)) {
            repeat(stack, item);
        }
        else if (isNotOneOf(item)) {
            notOneOf(stack, item);
        }
        else if (isOneOf(item)) {
            oneOf(stack, item);
        }
        else if (isOptional(item)) {
            optional(stack, item);
        }
        else if (isRef(item)) {
            ref(spec, stack, item);
        }
        else if (typeof item === 'string' || typeof item === 'number') {
            parts.push(item);
        }
    }
    return parts.reverse().join('');
};
export default load;
