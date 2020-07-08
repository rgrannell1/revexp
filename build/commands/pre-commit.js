
const command = {
  name: 'pre-commit',
  dependencies: ['lint', 'depcheck']
}

command.cli = `
Usage:
  script pre-commit

Description:
  Run precommit checks against this repository.

Options:
  --params PARAMS
`

command.task = async args => { }

module.exports = command
