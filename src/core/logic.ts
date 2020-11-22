
import * as random from './random'

import {
  StringThunk
} from './core/commons/types'

export const or = (ths: StringThunk[]) => {
  return random.oneOf(ths)
}

export const and = (ths: StringThunk[]) => {
  return () => ths.map(th => th()).join('')
}
