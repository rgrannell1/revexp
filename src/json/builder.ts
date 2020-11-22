
import * as random from "../core/random.js"
import * as characters from "../core/characters.js"
import * as classes from "../core/character-classes.js"
import {
  Config,
  Digit,
  Every,
  NotOneOf,
  OneOf,
  Optional,
  Ref,
  Repeat,
  Spec,
  Stack
} from "./types"

const every = (stack: Stack, part: Every) => {
  part.every.forEach(item => {
    stack.push(item)
  })
}

const isEvery = (candidate: any): candidate is Every => {
  return candidate && candidate.hasOwnProperty('every')
}

const digit = (stack: Stack, part: Digit) => {
  const item = part.digit.zero
    ? characters.digit()
    : characters.nonZeroDigit()

  stack.push(item)
}

const isDigit = (candidate: any): candidate is Digit => {
  return candidate && candidate.hasOwnProperty('digit')
}

const isRepeat = (candidate: any): candidate is Repeat => {
  return candidate && candidate.hasOwnProperty('repeat')
}

const isNotOneOf = (candidate: any): candidate is NotOneOf => {
  return candidate && candidate.hasOwnProperty('notOneOf')
}

const isOneOf = (candidate: any): candidate is OneOf => {
  return candidate && candidate.hasOwnProperty('oneOf')
}

const isOptional = (candidate: any): candidate is Optional => {
  return candidate && candidate.hasOwnProperty('optional')
}

const isRef = (candidate: any): candidate is Ref => {
  return candidate && candidate.hasOwnProperty('ref')
}

const repeat = (stack: Stack, part: Repeat) => {
  if (typeof part.repeat.from === 'undefined' && typeof part.repeat.to === 'undefined') {
    return
  }
  if (part.repeat.from === 0 && part.repeat.to === 0) {
    return
  }

  const repeatCount = random.range(part.repeat.from || 0, part.repeat.to || 256)

  for (let ith = 0; ith <= repeatCount; ++ith) {
    stack.push(part.repeat.value)
  }
}

const notOneOf = (stack: Stack, part: NotOneOf) => {
  const item = classes.notOneOf(part.notOneOf)()
  stack.push(item)
}

const oneOf = (stack: Stack, part: OneOf) => {
  stack.push(random.oneOf(part))
}

const optional = (stack: Stack, part: Optional) => {
  if (random.coinFlip()) {
    stack.push(part.optional)
  }
}

const ref = (spec: Spec, stack: Stack, part: Ref) => {
  stack.push(spec[part.ref])
}

const load = (spec: Spec, part: Config) => {
  const stack: Stack = [part]
  const parts: string[] = []

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
    } else if (typeof item === 'string' || typeof item === 'number') {
      parts.push(item)
    }
  }

  return parts.reverse().join('')
}

export default load
