import { join, toMapOf as fromKeyValues, concat as fromValues} from 'taowei'
import attributes from './attributes.js'

const contentTag = (name) => (attrs) => (children) => {
  const attrsStr = attributes(attrs)
  const content = join('')(children)

  return `<${name}${attrsStr ? ` ${attrsStr}` : ''}>${content}</${name}>`
}

export default (name) => (...attrs) => (...children) => {
  // TODO: validate input

  return contentTag(name)(fromKeyValues(attrs))(fromValues(children))
}
