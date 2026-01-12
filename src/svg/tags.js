import { map, toPojo } from 'taowei'

import contentTag from '../html/contentTag.js'
import voidTag from '../html/voidTag.js'

const contentTags = [
  'svg',
  'g',
  'defs',
  'symbol',
  'switch',

  'a',
  'text',
  'textPath',
  'tspan',

  'style',
  'script',

  'title',
  'desc',
  'metadata',

  'clipPath',
  'mask',
  'marker',
  'pattern',

  'linearGradient',
  'radialGradient',

  'filter',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feDropShadow',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',

  'foreignObject',
]

const voidTags = [
  'path',
  'circle',
  'ellipse',
  'line',
  'rect',
  'polyline',
  'polygon',

  'stop',

  'use',
  'image',
]

export default toPojo([
  ...map((name) => [name, contentTag(name)])(contentTags),
  ...map((name) => [name, voidTag(name)])(voidTags),
])
