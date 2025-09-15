import { join } from 'taowei'

import fromValues from '../../fromValues.js'

const fontFamily = (fonts) => ({ 'font-family': join(', ')(fonts) })

export default (...fonts) => fontFamily(fromValues(fonts))
