
const utils = {}

utils.repeat = (fn, num) => {
  for (let ith = 0; ith < num; ++ith) {
    fn()
  }
}

export default utils
