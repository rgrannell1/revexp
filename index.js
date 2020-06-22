
const json = require('./src/json')
const logic = require('./src/logic')
const characters = require('./src/characters')
const quantifiers = require('./src/quantifiers')
const classes = require('./src/character-classes')

const shrink = ({test, gen, all = false, until}) => {
  let min
  let count = 0
  const sequence = []
  const start = Date.now()

  while (true) {
    count++
    let str = gen()
    try {
      test(str)
    } catch (err) {
      if (!min || str.length < min.length) {
        min = str
        if (all) {
          sequence.push(min)
        }
      }
    }

    if (until(count, start)) {
      return all
        ? sequence
        : min
    }
  }
}

const mins = {}

const until = {}

until.count = target => count => {
  return count >= target
}

until.timeElapsed = target => (count, start) => {
  return Date.now() >= (start + target)
}

console.log(cases)
