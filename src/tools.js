
const json = require('./json')
const logic = require('./logic')
const characters = require('./characters')
const quantifiers = require('./quantifiers')
const classes = require('./character-classes')

const tools = { }

tools.shrink = ({ test, gen, all = false, until }) => {
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
      return all ? sequence : min
    }
  }
}

tools.shrink.until = {}

tools.shrink.until.count = target => count => {
  return count >= target
}

tools.shrink.until.timeElapsed = target => (count, start) => {
  return Date.now() >= (start + target)
}


module.exports = tools
