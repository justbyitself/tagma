import { camelToKebab, join, map, toMapOf as fromKeyValues, toIterable } from 'taowei'

const formatProperty = ([k, v]) => 
  `${camelToKebab(k)}: ${join(' ')(toIterable(v))};`

const rule = (selector) => (properties) => {
  const propertiesStr = join('\n\t')(map(formatProperty)(properties))

  return `${selector} {\n\t${propertiesStr}\n}\n`
}

export default (selector) => (...properties) =>
  rule(selector)(fromKeyValues(properties))
