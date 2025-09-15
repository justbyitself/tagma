import { join } from 'taowei'

import fromValues from '../../fromValues.js'

const className = (classNames) => ({ class: join(', ')(classNames) })

export default (...classNames) => className(fromValues(classNames))
