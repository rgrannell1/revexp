
const { RevExp } = require('./src/interface')

const val = new RevExp()
  .or([
    'aaa',
    new RevExp().or('bccc', 'cxxx'),
    RevExp.any()
  ])
  .build()

console.log(val())
