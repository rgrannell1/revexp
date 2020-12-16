
import { StringThunk } from '../core/commons/types'

const firehose = function* (gen: StringThunk, ms:number) {
  const start = Date.now()

  while (Date.now() - start > ms) {
    yield gen()
  }
}

export default firehose
