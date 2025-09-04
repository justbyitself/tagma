import { join } from 'taowei'

import docType from './docType.js'
import { tags } from './index.js'


export default (...attrs) => (...content) => join()
  (docType(), tags.html(...attrs)(...content))