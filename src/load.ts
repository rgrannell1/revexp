
import * as random from "./random"
import * as characters from "./characters"
import * as classes from "./character-classes"

interface Every {
  every: any[]
}

interface Digit {
  digit: {
    zero?: Boolean
  }
}

interface Repeat {
  value: Config,
  min?: number
  max?: number
}

interface OneOf {
  oneOf: Config[]
}

interface NotOneOf {
  notOneOf: string[]
}

interface Ref {
  ref: string
}


interface Optional {
  value: Config
}

const every = (stack:Stack, part:Every) => {
  part.every.forEach(item => {
    stack.push(item)
  })
}

const isEvery = (candidate:any): candidate is Every => {
  return candidate.hasOwnProperty('every')
}

const digit = (stack:Stack, part:Digit) => {
  const item = part.digit.zero
    ? characters.digit()
    : characters.nonZeroDigit()

  stack.push(item)
}

const isDigit = (candidate:any): candidate is Digit => {
  return candidate.hasOwnProperty('digit')
}

const isRepeat = (candidate:any): candidate is Repeat => {
  return candidate.hasOwnProperty('repeat')
}

const isNotOneOf = (candidate:any): candidate is NotOneOf => {
  return candidate.hasOwnProperty('notOneOf')
}

const isOneOf = (candidate:any): candidate is OneOf => {
  return candidate.hasOwnProperty('oneOf')
}

const isOptional = (candidate:any): candidate is Optional => {
  return candidate.hasOwnProperty('optional')
}

const isRef = (candidate:any): candidate is Ref => {
  return candidate.hasOwnProperty('ref')
}

const repeat = (stack:Stack, part:Repeat) => {

}

const notOneOf = (stack:Stack, part:NotOneOf) => {
  const item = classes.notOneOf(part.notOneOf)()
  stack.push(item)
}

const oneOf = (stack:Stack, part:OneOf) => {
  const subpart = random.oneOf(part)
  stack.push(subpart)
}

const optional = (stack:Stack, part:Optional) => {

}

const ref = (spec:Spec, stack:Stack, part:Ref) => {
  stack.push(spec[part.ref])
}

type Config = 
  Digit    | 
  Every    | 
  Repeat   | 
  NotOneOf |
  OneOf    |
  Optional |
  Ref 

type Stack = Config[]
type Spec = {
  [key:string]: Config
}

const load = (spec:Spec, part:Config) => {
  const stack:Stack = [part]
  const parts:string[] = []

  while (stack.length > 0) {
    const item = stack.pop()

    if (isDigit(item)) {
      digit(stack, item)
    } else if (isEvery(item)) {
      every(stack, item)
    } else if (isRepeat(item)) {
      repeat(stack, item)
    } else if (isNotOneOf(item)) {
      notOneOf(stack, item)
    } else if (isOneOf(item)) {
      oneOf(stack, item)
    } else if (isOptional(item)) {
      optional(stack, item)
    } else if (isRef(item)) {
      ref(spec, stack, item)
    }
  }

  return parts.join('')
}

export default load 
