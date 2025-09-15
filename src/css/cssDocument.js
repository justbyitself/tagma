import { join } from 'taowei'

import fromValues from '../fromValues.js'

const cssDocument = join('\n')

export default (...rules) => cssDocument(fromValues(rules))
