import { join } from 'taowei'
import attributes from './attributes.js'

import fromKeyValues from '../fromKeyValues.js'
import fromValues from '../fromValues.js'

const contentTag = (name) => (attrs) => (children) => {
  const attrsStr = attributes(attrs)
  const content = join('')(children)

  return `<${name}${attrsStr ? ` ${attrsStr}` : ''}>${content}</${name}>`
}

export default (name) => (...attrs) => (...children) => {
  // TODO: validate input

  return contentTag(name)(fromKeyValues(attrs))(fromValues(children))
}
