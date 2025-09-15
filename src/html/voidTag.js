import attributes from './attributes.js'

import fromKeyValues from '../fromKeyValues.js'

const voidTag = (name) => (attrs) => {
  const attrsStr = attributes(attrs)
  return `<${name}${attrsStr ? ` ${attrsStr}` : ''} />`
}

export default (name) => (...attrs) => voidTag(name)(fromKeyValues(attrs))
