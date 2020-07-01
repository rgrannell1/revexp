
const chalk = require('chalk')
const jsdiff = require('diff')

const diff = {}

/**
 * Display a character diff
 *
 * @param {*} str0
 * @param {*} str1
 */
diff.show = (str0, str1) => {
  const strdiff = jsdiff.diffChars(str0, str1)
  console.log(strdiff)
}

module.exports = diff
