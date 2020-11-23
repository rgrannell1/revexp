
import * as random from './random.js'

import {
  StringThunk
} from './commons/types'

export const or = (ths: StringThunk[]) => {
  return random.oneOf(ths)
}

export const and = (ths: StringThunk[]) => {
  return () => ths.map(th => th()).join('')
}
