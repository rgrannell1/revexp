
import {
  Generator
} from '../types.js'


export const fails = (gen:Generator, test:Function) => {
  return () => {
    const tcase = test()
    try {
      test(tcase)
      return [false]
    } catch {
      return [true, tcase]
    }  
  }
}

export const findFailures = function * (gen:Generator, test:Function) {
  const isFailure = fails(gen, test)

  while (true) {
    let [failed, tcase] = isFailure()
    if (failed) {
      yield tcase
    }    
  }
}
