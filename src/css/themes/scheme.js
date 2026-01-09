import root from '../root.js'
import declare from '../declare.js'
import media from '../media.js'

export default (theme, defaultMode = 'light') => {
  const altMode = defaultMode === 'light' ? 'dark' : 'light'

  const defaultTheme = theme[defaultMode]
  const altTheme = { ...theme[defaultMode], ...theme[altMode] }

  return `
    ${root(declare(defaultTheme))}
    ${media(`(prefers-color-scheme: ${altMode})`)(root(declare(altTheme)))}
    `
}