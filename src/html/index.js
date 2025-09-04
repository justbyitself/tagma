export { default as docType } from './docType.js'
export { default as comment } from './comment.js'
export { default as attributes } from './attributes.js'
export { default as voidTag } from './voidTag.js'
export { default as contentTag } from './contentTag.js'
export { default as htmlDocument } from './htmlDocument.js'
export { default as compact } from './compact.js'

import tagsGenerator from './tags.js'
export const tags = tagsGenerator()
