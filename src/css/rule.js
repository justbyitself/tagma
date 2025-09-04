import { toMap, toIterator, map, join } from 'taowei'

const camelToKebab = (str) => 
  str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)

const formatProperty = (key, value) => `${camelToKebab(key)}: ${value};`

export default selector => (...args) => {
  const propertiesStr = join('\n\t')(
    map(
      ([key, value]) => formatProperty(key, value)
    )(toIterator(toMap(...args)))
  )

  return `${selector} {\n\t${propertiesStr}\n}\n`
}
