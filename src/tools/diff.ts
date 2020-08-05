
import * as jsdiff from 'diff'

/**
 * Display a character diff
 *
 * @param {*} str0
 * @param {*} str1
 */
export const show = (str0:string, str1:string) => {
  const strdiff = jsdiff.diffChars(str0, str1)
  console.log(strdiff)
}
