import { join, concat as fromValues } from 'taowei'

export default (...rules) => join('\n')(fromValues(rules))
