import rule from '../rule.js'
import media from '../media.js'
import toVarName from '../toVarName.js'

export default (theme, defaultMode = 'light') => {
  const altMode = defaultMode === 'light' ? 'dark' : 'light'
  const allKeys = new Set([...Object.keys(theme.light), ...Object.keys(theme.dark)])

  const getProps = (mode) => Array.from(allKeys).reduce((acc, key) => {
    acc[toVarName(key)] = theme[mode][key] ?? theme[defaultMode][key]
    return acc
  }, {})

  const base = rule(':root')(getProps(defaultMode))
  const alt = rule(':root')(getProps(altMode))

  return `${base}\n${media(`(prefers-color-scheme: ${altMode})`)(alt)}`
}