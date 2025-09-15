import {
  cond,
  isFalse,
  isNullish,
  isTrue,
  join,
  map,
  otherwise,
  trim,
} from 'taowei'

import fromKeyValues from '../fromKeyValues.js'

const format = cond([
  [([_, value]) => isNullish(value), ''],
  [([_, value]) => isFalse(value), ''],
  [([_, value]) => isTrue(value), ([key]) => `${key}`],
  [otherwise, ([key, value]) => `${key}="${value}"`],
])

const attributes = (attrs) => trim(join(' ')(map(format)(attrs)))

export default (...attrs) => attributes(fromKeyValues(attrs))
