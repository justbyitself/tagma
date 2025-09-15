import { join } from 'taowei'

import docType from './docType.js'
import contentTag from './contentTag.js'

import fromKeyValues from '../fromKeyValues.js'
import fromValues from '../fromValues.js'

const htmlDocument = attrs => children =>
  join('')([docType(), contentTag('html')(attrs)(children)])

export default (...attrs) => (...children) =>
  htmlDocument(fromKeyValues(attrs))(fromValues(children))
