
import load from './load.js'
import * as spec from './specs/json-config.js'

const gen = () => load(spec, spec.object)

while (true) {
  gen()
}
