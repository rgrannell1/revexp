import evolveFn from './evolve.js';
import shrinkFn from './shrink.js';
import * as jsdiff from 'diff';
/**
 * Display a character diff
 *
 * @param {*} str0
 * @param {*} str1
 */
export const diff = (str0, str1) => {
    const strdiff = jsdiff.diffChars(str0, str1);
    console.log(strdiff);
};
export const evolve = evolveFn;
export const shrink = shrinkFn;
