
const classes = require('./character-classes')
const logic = require('./logic')
const char = require('./characters')
const retree = require('regexp-tree')

const interfaces = {}

interfaces.json = () => {

}

const asGenerators = args => {
  return args.map(arg => {
    return typeof arg === 'function'
      ? arg
      : char.literal(arg)
  })
}

const asBuilt = args => {
  return args.map(arg => {
    return arg?.build
      ? arg.build()
      : arg
  })
}

class RevExp {
  constructor () {
    this.args = []
  }
  // -- character classes.
  or (args) {
    // -- allow generators and strings to be mixed.
    const built = asBuilt(args)

    const gen = logic.or(asGenerators(built))
    this.args.push(gen)
    return this
  }
  notOneOf (...gens) {

  }
  range () {

  }
  notRange () {

  }

  // -- characters.
  static any () {
    return char.any()
  }
  static digit () {
    return char.digit()
  }
  static nonZeroDigit () {
    return char.wordChar()
  }
  static wordChar () {
    return char.wordChar()
  }
  static space () {
    return char.space()
  }
  static literal (val) {
    return char.literal(val)
  }
  // -- quantifiers
  optional (gen) {
    const genOpt = quantifiers.onceOrNone(gen)
    this.args.push(gen)
    return this
  }
  repeat () {

  }

  build () {
    return logic.and(this.args)
  }
}

interfaces.RevExp = RevExp

module.exports = interfaces
