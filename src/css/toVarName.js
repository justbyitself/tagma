import { camelToKebab } from 'taowei'

export default (name) => name.startsWith('--') ? name : `--${camelToKebab(name)}`