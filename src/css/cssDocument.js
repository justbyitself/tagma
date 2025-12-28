import { join, concat as fromValues } from 'taowei'

const cssDocument = join('\n')

export default (...rules) => cssDocument(fromValues(rules))
