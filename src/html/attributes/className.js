import { join, concat as fromValues } from 'taowei'

const className = (classNames) => ({ class: join(', ')(classNames) })

export default (...classNames) => className(fromValues(classNames))
