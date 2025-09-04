import { toArray, concat } from 'taowei'
import attributes from './attributes.js'

export default name => attrs => (...children) => {
  const attrsStr = attributes(attrs)
  const content = toArray(concat(...children)).join('')

  return `<${name}${attrsStr ? ` ${attrsStr}` : ''}>${content}</${name}>`
}
