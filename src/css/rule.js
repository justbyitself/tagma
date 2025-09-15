import { camelToKebab, join, map } from 'taowei'

import fromKeyValues from '../fromKeyValues.js'

const formatProperty = ([key, value]) => `${camelToKebab(key)}: ${value};`

const rule = (selector) => (properties) => {
  const propertiesStr = join('\n\t')(map(formatProperty)(properties))

  return `${selector} {\n\t${propertiesStr}\n}\n`
}

export default (selector) => (...properties) =>
  rule(selector)(fromKeyValues(properties))
