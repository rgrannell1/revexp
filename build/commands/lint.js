
const path = require('path')
const lint = require('@rgrannell/lint')

const command = {
  name: 'lint',
  dependencies: []
}

command.cli = `
Usage:
  script lint

Description:
  Assert there are no linting errors
`

command.task = async args => {
  const fpath = path.join(__dirname, '../../**/*.js')
  await lint(fpath)
}

module.exports = command
