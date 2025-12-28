import { join, toMapOf as fromKeyValues, concat as fromValues } from 'taowei'

import docType from './docType.js'
import contentTag from './contentTag.js'


const htmlDocument = (attrs) => (children) =>
  join('')([docType(), contentTag('html')(attrs)(children)])

export default (...attrs) => (...children) =>
  htmlDocument(fromKeyValues(attrs))(fromValues(children))
