import attributes from './attributes.js'

export default name => attrs => {
  const attrsStr = attributes(attrs);
  return `<${name}${attrsStr ? ` ${attrsStr}` : ''} />`
}
