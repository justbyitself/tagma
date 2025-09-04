import { toMap, toIterator, unwords, map, trim, isNullish, isFalse, isTrue, cond, otherwise } from 'taowei'

const format = (key, value) => cond(
  [isNullish, ''],
  [isFalse, ''],
  [isTrue, `${key}`],
  [otherwise, `${key}="${value}"`]
)(value)

export default (...args) => trim(unwords(
  map(([key, value]) => format(key, value))(toIterator(toMap(...args)))
))