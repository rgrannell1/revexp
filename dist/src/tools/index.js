import evolve from './evolve.js';
import shrink from './shrink.js';
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
const tools = {
    diff,
    mutate: evolve,
    shrink
};
export default tools;
