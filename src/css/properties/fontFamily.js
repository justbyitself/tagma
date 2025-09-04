import { join } from 'taowei'

export default (...args) => ({"font-family": join(', ')(...args)})