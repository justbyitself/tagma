import { toMap, map } from 'taowei'

import contentTag from './contentTag.js'
import voidTag from './voidTag.js'

const contentTags = [
  'a', 'abbr', 'address', 'article', 'aside', 'b', 'bdi', 'bdo', 
  'blockquote', 'body', 'button', 'canvas', 'caption', 'cite', 'code', 
  'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 
  'div', 'dl', 'dt', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 
  'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 
  'html', 'i', 'iframe', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 
  'map', 'mark', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 
  'option', 'output', 'p', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 
  's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 
  'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 
  'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 
  'u', 'ul', 'var', 'video'
]

const voidTags = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]

export default () => Object.fromEntries(toMap(
  map(name => [name, contentTag(name)])(contentTags),
  map(name => [name, voidTag(name)])(voidTags)
))
