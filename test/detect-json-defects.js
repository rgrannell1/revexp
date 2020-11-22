
import * as json from '../src/specs/json-config.js'
import load from '../src/load.js'
import chalk from 'chalk'
import tools from '../src/tools/index.js'

const test = val => JSON.parse(val)
const gen = () => load(json, json.object)

console.log('detecting failing JSON cases.')

const failingCase = tools.shrink({
  test,
  gen,
  until: tools.shrink.until.timeElapsed(3000)
})

if (failingCase) {
  console.log(chalk.red('failures detected; attempting to simplify.'))

  try {
    var mutated = tools.mutate({
      test,
      str: failingCase,
      until: tools.shrink.until.timeElapsed(20 * 1000)
    })
  } catch (err) { }

  if (mutated) {
    console.log('\n\n\ndiff:')
    tools.diff.show(mutated.invalid, mutated.valid)
  } else {
    console.error(chalk.yellow('failed to simplify'))
    console.log(failingCase)
  }

} else {
  tap.pass(`no invalid JSON could be found in set timespan.`)
}
