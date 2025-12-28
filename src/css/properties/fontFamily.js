import { join, concat as fromValues } from 'taowei'

const fontFamily = (fonts) => ({ 'font-family': join(', ')(fonts) })

export default (...fonts) => fontFamily(fromValues(fonts))
